

// const {google} = require('googleapis');
// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// const app = express();

// // Middleware to parse JSON and urlencoded data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URIS
// );

// try {
//     const creds = fs.readFileSync("creds.json");
//     oauth2Client.setCredentials(JSON.parse(creds));
// } catch(err) {
//     console.log("no creds found");
// }

// // const port = process.env.PORT || 3000;

// // app.get("/auth/google", (req, res) => {
// //     const url = oauth2Client.generateAuthUrl({
// //         access_type: 'offline',
// //         scope: [
// //             'https://www.googleapis.com/auth/drive',
// //             'https://www.googleapis.com/auth/drive.file', 
// //             'https://www.googleapis.com/auth/userinfo.profile'
// //         ]
// //     });
// //     res.redirect(url);
// // });
// app.get("/auth/google", (req, res) => {
//     try {
//         // Generate the Google authentication URL with the required scopes
//         const url = oauth2Client.generateAuthUrl({
//             access_type: 'offline',
//             prompt: 'consent',
//             scope: [
//                 'https://www.googleapis.com/auth/drive',
//                 'https://www.googleapis.com/auth/drive.appdata',
//                 'https://www.googleapis.com/auth/drive.file',
//                 'https://www.googleapis.com/auth/drive.metadata',
//                 'https://www.googleapis.com/auth/drive.metadata.readonly',
//                 'https://www.googleapis.com/auth/drive.photos.readonly',
//                 'https://www.googleapis.com/auth/drive.readonly',
//                 'https://www.googleapis.com/auth/drive.scripts'

//             ]
//         });

//         // Log the generated URL (optional and for debugging purposes only)
//         console.log('Generated Google Auth URL:', url);

//         // Redirect the user to the Google authentication URL
//         res.redirect(url);
//     } catch (error) {
//         // Handle errors (optional: log the error and send a response to the client)
//         console.error('Error generating Google Auth URL:', error);
//         res.status(500).send('Error generating Google Auth URL');
//     }
// });


// // app.get("/saveText/:sometext", async (req, res) => {
// //     const sometext = req.params.sometext;
// //     const drive = google.drive({
// //         version: "v3", auth: oauth2Client
// //     });

// //     try {
// //         await drive.files.create({
// //             requestBody: {
// //                 name: "test.txt",
// //                 mimeType: "text/plain"
// //             },
// //             media: {
// //                 mimeType: "text/plain",
// //                 body: sometext
// //             }
// //         });
// //         res.send("File saved successfully!");
// //     } catch(error) {
// //         console.error("Error while saving the file", error);
// //         res.status(500).send("Error while saving the file");
// //     }
// // });
// // app.get("/savePDF", async (req, res) => {
// //     // Assuming you want to upload a static file named "document.pdf"
// //     const pdfPath = "TechnicalServicesAgreement.pdf";
// //     const drive = google.drive({
// //         version: "v3", auth: oauth2Client
// //     });

// //     try {
// //         await drive.files.create({
// //             requestBody: {
// //                 name: "uploadedfromnode.pdf",
// //                 mimeType: "application/pdf"
// //             },
// //             media: {
// //                 mimeType: "application/pdf",
// //                 body: fs.createReadStream(pdfPath)
// //             }
// //         });
// //         res.send("PDF saved successfully!");
// //     } catch(error) {
// //         console.error("Error while saving the PDF", error);
// //         res.status(500).send("Error while saving the PDF");
// //     }
// // });

// // app.get("/saveImage", async (req, res) => {
// //     const sometext = req.params.sometext;
// //     const drive = google.drive({
// //         version: "v3", auth: oauth2Client
// //     });

// //     try {
// //         await drive.files.create({
// //             requestBody: {
// //                 name: "uploadedfromnode.png",
// //                 mimeType: "image/png"
// //             },
// //             media: {
// //                 mimeType: "image/png",
// //                 body: fs.createReadStream("logo.PNG")
// //             }
// //         });
// //         res.send("File saved successfully!");
// //     } catch(error) {
// //         console.error("Error while saving the file", error);
// //         res.status(500).send("Error while saving the file");
// //     }
// // });
// app.get("/google/redirect", async (req, res) => {
//     const { code } = req.query;

//     if (!code) {
//         return res.status(400).send("Authorization code not found");
//     }

//     try {
//         const {tokens} = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);
//         fs.writeFileSync("creds.json", JSON.stringify(tokens));
//         res.send("Authentication successful");
//     } catch(error) {
//         console.error("Error retrieving access token", error);
//         res.status(500).send("Error retrieving access token");
//     }
// });





// app.get("/google/redirect", async (req, res) => {
//     const { code } = req.query;

//     if (!code) {
//         return res.status(400).send("Authorization code not found");
//     }

//     try {
//         const {tokens} = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);
//         fs.writeFileSync("creds.json", JSON.stringify(tokens));
//         res.send("success");
//     } catch(error) {
//         console.error("Error retrieving access token", error);
//         res.status(500).send("Error retrieving access token");
//     }
// });

// // ... rest of the code in auth.js ...
// module.exports = {
//     oauth2Client,
//     googleAuthRoute: app.get("/auth/google", ),
//     // saveTextRoute: app.get("/saveText/:sometext", ),
//     // savePDFRoute: app.get("/savePDF", ),
//     googleRedirectRoute: app.get("/google/redirect",)
// };


// // app.listen(port, () => {
// //     console.log(`Server started on http://localhost:${port}`);
// // });


const { google } = require('googleapis');
const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URIS
);

// Attempt to load previously saved credentials
// try {
//     const creds = fs.readFileSync("creds.json");
//     oauth2Client.setCredentials(JSON.parse(creds));
// } catch (err) {
//     console.log("No saved credentials found");
// }
try {
    const creds = JSON.parse(fs.readFileSync("creds.json"));
    oauth2Client.setCredentials(creds);
    oauth2Client.on('tokens', (tokens) => {
        if (tokens.refresh_token) {
            creds.refresh_token = tokens.refresh_token;
        }
        creds.access_token = tokens.access_token;
        fs.writeFileSync('creds.json', JSON.stringify(creds));
    });
} catch (err) {
    console.log("No saved credentials found");
}

// Generate Google Auth URL and redirect to it
app.get("/auth/google", (req, res) => {
    // Your previous code is okay, no need for changes
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/drive',
                            'https://www.googleapis.com/auth/drive.appdata',
                            'https://www.googleapis.com/auth/drive.file',
                            'https://www.googleapis.com/auth/drive.metadata',
                            'https://www.googleapis.com/auth/drive.metadata.readonly',
                            'https://www.googleapis.com/auth/drive.photos.readonly',
                            'https://www.googleapis.com/auth/drive.readonly',
                            'https://www.googleapis.com/auth/drive.scripts'
            // ... add or remove scopes as needed
        ]
    });
    res.redirect(url);
});

// Handle the Google OAuth2 callback
app.get("/google/redirect", async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).send("Authorization code not found");
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        fs.writeFileSync("creds.json", JSON.stringify(tokens));
        res.send("Authentication successful! You can close this tab.");
    } catch (error) {
        console.error("Error retrieving access token", error);
        res.status(500).send("Error retrieving access token");
    }
});

module.exports = {
    oauth2Client,
    googleAuthRoute: app.get("/auth/google", ),
    // saveTextRoute: app.get("/saveText/:sometext", ),
    // savePDFRoute: app.get("/savePDF", ),
    googleRedirectRoute: app.get("/google/redirect",)
};

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
// });
