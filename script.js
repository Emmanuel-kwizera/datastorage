import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOWQvhiC_J_x57TO4tet_r50h2ML0nqV0",
    authDomain: "data-storage-a3eab.firebaseapp.com",
    projectId: "data-storage-a3eab",
    storageBucket: "data-storage-a3eab.firebasestorage.app",
    messagingSenderId: "918028427162",
    appId: "1:918028427162:web:b42f727260dd730a922423",
    measurementId: "G-0HDEMVNVX9"
};

// Initialize Firebase & Firestore
console.log("Initializing Firebase app & Firestore...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const visitorForm = document.querySelector("#visitor-form");
const visitorNameInput = document.querySelector("#visitor-name");
const companyVisitingInput = document.querySelector("#company-visiting");
const visitorList = document.querySelector("#visitor-list");
const submitBtn = document.querySelector("#submit-btn");

// Show loading state initially
visitorList.innerHTML = `<li style="color: var(--text-muted); justify-content: center;">Connecting to Firebase...</li>`;

// Store all visitors from active collection
const docsMap = new Map();

function renderAllVisitors() {
    visitorList.innerHTML = "";

    if (docsMap.size === 0) {
        visitorList.innerHTML = `<li style="color: var(--text-muted); justify-content: center;">No visitors signed in yet.</li>`;
        return;
    }

    docsMap.forEach((visitor) => {
        const li = document.createElement("li");

        const infoDiv = document.createElement("div");
        infoDiv.className = "visitor-info";

        const nameEl = document.createElement("span");
        nameEl.className = "visitor-name";
        nameEl.textContent = visitor.Name || visitor.name || "Anonymous";

        const companyEl = document.createElement("span");
        companyEl.className = "company-name";
        companyEl.textContent = `Visiting: ${visitor.Company || visitor.company || "N/A"}`;

        infoDiv.appendChild(nameEl);
        infoDiv.appendChild(companyEl);
        li.appendChild(infoDiv);

        visitorList.appendChild(li);
    });
}

// Helper to listen to a collection name
function listenToCollection(collectionName) {
    console.log(`Setting up real-time listener for collection: "${collectionName}"`);
    const colRef = collection(db, collectionName);

    onSnapshot(
        colRef,
        (snapshot) => {
            console.log(`Collection "${collectionName}" update: found ${snapshot.size} documents.`);
            
            // Remove previous entries from this collection
            snapshot.docChanges().forEach((change) => {
                const docId = `${collectionName}_${change.doc.id}`;
                if (change.type === "removed") {
                    docsMap.delete(docId);
                } else {
                    const data = change.doc.data();
                    console.log(`Document [${change.doc.id}]:`, data);
                    docsMap.set(docId, data);
                }
            });

            renderAllVisitors();
        },
        (error) => {
            console.error(`Error reading "${collectionName}":`, error);
            // Only show permission error if no documents loaded yet
            if (docsMap.size === 0) {
                visitorList.innerHTML = `
                    <li style="color: #ef4444; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
                        <strong>Firebase Error (${collectionName}):</strong>
                        <span style="font-size: 0.85rem;">${error.message}</span>
                        ${error.code === "permission-denied" ? '<span style="font-size: 0.8rem; color: var(--text-secondary);">Hint: Update your Firestore Security Rules in Firebase Console to allow read access.</span>' : ''}
                    </li>
                `;
            }
        }
    );

    return colRef;
}

// Listen to both "visitors" and "Visitors" in case collection was capitalized in Console
const visitorsCol = listenToCollection("visitors");
const capitalVisitorsCol = listenToCollection("Visitors");

// Form submission to save new visitors
if (visitorForm) {
    visitorForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = visitorNameInput.value.trim();
        const company = companyVisitingInput.value.trim();

        if (!name || !company) return;

        submitBtn.disabled = true;
        submitBtn.textContent = "Signing in...";

        try {
            const visitorData = {
                Name: name,
                Company: company,
                name: name,
                company: company,
                createdAt: serverTimestamp()
            };

            // Save to "visitors"
            await addDoc(visitorsCol, visitorData);
            console.log("Successfully added visitor to Firestore:", visitorData);

            visitorForm.reset();
            visitorNameInput.focus();
        } catch (error) {
            console.error("Error adding visitor:", error);
            alert("Could not sign in visitor: " + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
        }
    });
}