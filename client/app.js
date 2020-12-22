$(document).ready(() => {

    // check whether current browser supports WebAuthn
    if (!window.PublicKeyCredential) {
        alert("Error: this browser does not support WebAuthn");
        return;
    }

    $('#create-btn').click(async () => {
        //let res = await getChallenge();
        //console.log(res);
        CreateCredential();
    });

    function getChallenge() {
      return fetch('http://localhost:3000/challenge')
        .then(response => { 
          return response.arrayBuffer();
        });
    }

    async function CreateCredential() {
        const publicKeyCredentialCreationOptions = {
            challenge: new Uint8Array([117, 61,252, 231, 191, 241]), //Uint8Array.from(randomStringFromServer, c => c.charCodeAt(0)),
            rp: { 
              id: "acme.com", 
              name: "ACME Corporation" 
            },
            user: {
              id: new Uint8Array([117, 61,252, 231, 191, 241]), //Uint8Array.from("UZSL85T9AFC", c => c.charCodeAt(0)),
              name: "lee@webauthn.guide",
              displayName: "Lee",
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
              authenticatorAttachment: "cross-platform",
            },
            timeout: 60000,
            attestation: "direct"
          };
      
          if ('credentials' in navigator) {
            const credential = await navigator.credentials.create({
              publicKey: publicKeyCredentialCreationOptions
            });
          } else {
            //Handle sign-in the way you did before.
            alert("oops");
          };
    }
});