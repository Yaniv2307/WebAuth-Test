$(document).ready(() => {

    // check whether current browser supports WebAuthn
    if (!window.PublicKeyCredential) {
        alert("Error: this browser does not support WebAuthn");
        return;
    }

    if(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(() => {
      alert("yes!")
    }));

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
        console.log("host name: ", window.location.hostname);
        const publicKeyCredentialCreationOptions = {
            challenge: new Uint8Array([117, 61,252, 231, 191, 241]), //Uint8Array.from(randomStringFromServer, c => c.charCodeAt(0)),
            rp: { 
              name: "test",
              id: window.location.hostname,
            },
            user: {
              id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]), //Uint8Array.from("UZSL85T9AFC", c => c.charCodeAt(0)),
              name: "johndoe",
              displayName: "John Doe",
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
            },
            timeout: 60000,
            attestation: "direct"
          };
      
          if ('credentials' in navigator) {
            const credential = await navigator.credentials.create({
              publicKey: publicKeyCredentialCreationOptions
            });
            console.log(credential);
          } else {
            //Handle sign-in the way you did before.
            alert("oops");
          };
    }
});