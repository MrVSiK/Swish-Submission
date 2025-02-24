var width = 320 // We will scale the photo width to this
var height = 0 // This will be computed based on the input stream

// |streaming| indicates whether or not we're currently streaming
// video from the camera. Obviously, we start at false.

var streaming = false

// The various HTML elements we need to configure or control. These
// will be set by the startup() function.

var video = null
var canvas = null
var startbutton = null
let data
let logout = document.getElementById('logout')
let token
const API = "https://test-9t34.onrender.com/api";
document.getElementById('pop_msg').innerHTML = "wait for 2-3 seconds"

function autofill() {
  chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {

      const allURLs = {
        "facebook.com": {
          "username": "//*[@id='email']",
          "password": "//*[@id='pass']",
          "login": "/html/body/div[1]/div[2]/div[1]/div/div/div/div[2]/div/div[1]/form/div[2]/button"
        },
        "linkedin.com/login": {
          "username": "/html/body/div/main/div[2]/div[1]/form/div[1]/input",
          "password": "/html/body/div/main/div[2]/div[1]/form/div[2]/input",
          "login": "/html/body/div/main/div[2]/div[1]/form/div[3]/button"
        },
        "twitter.com/login": {
          "username": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[1]/label/div/div[2]/div/input",
          "password": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[2]/label/div/div[2]/div/input",
          "login": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div/span/span"
        },
        "instagram.com": {
          "username": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[1]/div/label/input",
          "password": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[2]/div/label/input",
          "login": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[3]/button"
        },
        "github.com/login": {
          "username": "/html/body/div[3]/main/div/div[4]/form/input[2]",
          "password": "/html/body/div[3]/main/div/div[4]/form/div/input[1]",
          "login": "/html/body/div[3]/main/div/div[4]/form/div/input[12]"
        },
        "vtop.vit.ac.in/vtop/initialProcess": {
          "username": "/html/body/div[1]/div/section/div/div[2]/form/div[1]/input",
          "password": "/html/body/div[1]/div/section/div/div[2]/form/div[2]/input",
          "login": "/html/body/div[1]/div/section/div/div[2]/form/div[3]/div[3]/button"
        },
        "in.pinterest.com": {
          "username": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[1]/fieldset/span/div/input",
          "password": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[4]",
          "login": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[5]/button"
        },
        "reddit.com/login": {
          "username": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[1]/input",
          "password": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[2]/input",
          "login": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[5]/button"
        },
        "quora.com": {
          "username": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[2]/input",
          "password": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[3]",
          "login": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[4]"
        },
        "netflix.com/in/login": {
          "username": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[1]/div[1]/div/label/input",
          "password": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[2]",
          "login": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/button"
        },
        "flipkart.com": {
          "username": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[1]/input",
          "password": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[2]/input",
          "login": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[4]/button"
        },
        "vpropel.in/loginn": {
          "username": "/html/body/div/div[2]/form/div[1]/input[1]",
          "password": "/html/body/div/div[2]/form/div[2]/input",
          "login": "/html/body/div/div[2]/form/div[4]/button"
        },
        "mail.rediff.com/cgi-bin/login.cgi": {
          "username": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[1]/div[2]/input",
          "password": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input[1]",
          "login": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input[2]"
        },
        "irctc.co.in/nget/train-search": {
          "username": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[1]/input",
          "password": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[2]/input",
          "login": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/span/button"
        },
        "shaadi.com": {
          "username": "/html/body/div/div[13]/form/div[2]/div[2]/input",
          "password": "/html/body/div/div[13]/form/div[2]/div[3]/input",
          "login": "/html/body/div/div[13]/form/div[2]/button[1]"
        },
        "account.similarweb.com/login": {
          "username": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[1]/div/div[1]/input",
          "password": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[2]/div/div[1]/div/input",
          "login": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/button"
        },
        "newtrade.sharekhan.com": {
          "username": "/html/body/div[1]/div[2]/div[1]/div[2]/div[2]/form/div[1]/div[3]/input",
          "password": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[2]/div/div[1]/div/input",
          "login": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/button"
        },
        "moodle.org/login/index.php": {
          "username": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/div[1]/input",
          "password": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/div[2]/input",
          "login": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/button"
        },
        "moodle.org/login/index.php": {
          "username": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[1]/div[1]/div/input",
          "password": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[1]/div[2]/div/input",
          "login": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[2]/div/input"
        },
        "moovit.vit.ac.in/login/index.php": {
          "username": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/div[1]/input",
          "password": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/div[2]/input",
          "login": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/button"
        },
        "amazon.com/ap/signin": {
          "username": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[1]/input",
          "password": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[1]/input",
          "login": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[2]/span/span/input"
        }


      }

      console.log(tabs[0].url);
      let url = tabs[0].url.replace("https://", "");
      url = url.replace("http://", "");
      url = url.replace("www.", "");
      const key = Object.keys(allURLs).find(key => url.includes(key));
      let get_detail_url;

      if (key) {
        get_detail_url = API + `/data-detail/${key}`
      }
      else {
        get_detail_url = API + `/data-detail/${url}`
      }

      fetch(get_detail_url, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${token.access}`,
        }
      }).then(res => res.json()).then(res => {
        var userdata = JSON.parse(JSON.stringify(res))
        username = userdata.username
        password = userdata.password
        let someJSON = { "userName": username, "password": password, "url": url };

        chrome.tabs.executeScript({
          code: '(' + function (params) {

            function getElementByXpath(path) {
              return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            }

            let allURLs = {
              "facebook.com": {
                "username": "//*[@id='email']",
                "password": "//*[@id='pass']",
                "login": "/html/body/div[1]/div[2]/div[1]/div/div/div/div[2]/div/div[1]/form/div[2]/button"
              },
              "linkedin.com/login": {
                "username": "/html/body/div/main/div[2]/div[1]/form/div[1]/input",
                "password": "/html/body/div/main/div[2]/div[1]/form/div[2]/input",
                "login": "/html/body/div/main/div[2]/div[1]/form/div[3]/button"
              },
              "twitter.com/login": {
                "username": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[1]/label/div/div[2]/div/input",
                "password": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[2]/label/div/div[2]/div/input",
                "login": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div/span/span"
              },
              "instagram.com": {
                "username": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[1]/div/label/input",
                "password": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[2]/div/label/input",
                "login": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[3]/button"
              },
              "github.com/login": {
                "username": "/html/body/div[3]/main/div/div[4]/form/input[2]",
                "password": "/html/body/div[3]/main/div/div[4]/form/div/input[1]",
                "login": "/html/body/div[3]/main/div/div[4]/form/div/input[12]"
              },
              "vtop.vit.ac.in/vtop/initialProcess": {
                "username": "/html/body/div[1]/div/section/div/div[2]/form/div[1]/input",
                "password": "/html/body/div[1]/div/section/div/div[2]/form/div[2]/input",
                "login": "/html/body/div[1]/div/section/div/div[2]/form/div[3]/div[3]/button"
              },
              "in.pinterest.com": {
                "username": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[1]/fieldset/span/div/input",
                "password": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[4]",
                "login": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[5]/button"
              },
              "reddit.com/login": {
                "username": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[1]/input",
                "password": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[2]/input",
                "login": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[5]/button"
              },
              "quora.com": {
                "username": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[2]/input",
                "password": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[3]",
                "login": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[4]"
              },
              "netflix.com/in/login": {
                "username": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[1]/div[1]/div/label/input",
                "password": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[2]",
                "login": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/button"
              },
              "flipkart.com": {
                "username": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[1]/input",
                "password": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[2]/input",
                "login": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[4]/button"
              },
              "vpropel.in/loginn": {
                "username": "/html/body/div/div[2]/form/div[1]/input[1]",
                "password": "/html/body/div/div[2]/form/div[2]/input",
                "login": "/html/body/div/div[2]/form/div[4]/button"
              },
              "mail.rediff.com/cgi-bin/login.cgi": {
                "username": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[1]/div[2]/input",
                "password": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input[1]",
                "login": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input[2]"
              },
              "irctc.co.in/nget/train-search": {
                "username": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[1]/input",
                "password": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[2]/input",
                "login": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/span/button"
              },
              "shaadi.com": {
                "username": "/html/body/div/div[13]/form/div[2]/div[2]/input",
                "password": "/html/body/div/div[13]/form/div[2]/div[3]/input",
                "login": "/html/body/div/div[13]/form/div[2]/button[1]"
              },
              "account.similarweb.com/login": {
                "username": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[1]/div/div[1]/input",
                "password": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[2]/div/div[1]/div/input",
                "login": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/button"
              },
              "newtrade.sharekhan.com": {
                "username": "/html/body/div[1]/div[2]/div[1]/div[2]/div[2]/form/div[1]/div[3]/input",
                "password": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[2]/div/div[1]/div/input",
                "login": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/button"
              },
              "moodle.org/login/index.php": {
                "username": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/div[1]/input",
                "password": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/div[2]/input",
                "login": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/button"
              },
              "moodle.org/login/index.php": {
                "username": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[1]/div[1]/div/input",
                "password": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[1]/div[2]/div/input",
                "login": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[2]/div/input"
              },
              "moovit.vit.ac.in/login/index.php": {
                "username": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/div[1]/input",
                "password": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/div[2]/input",
                "login": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/button"
              },
              "amazon.com/ap/signin": {
                "username": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[1]/input",
                "password": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[1]/input",
                "login": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[2]/span/span/input"
              }


            }

            const key = Object.keys(allURLs).find(key => params.url.includes(key));
            if (key) {
              getElementByXpath(allURLs[key].username).addEventListener("click", () => {
                getElementByXpath(allURLs[key].username).value = params.userName;
              }
              );
              // getElementByXpath(allURLs[key].username).click();
              getElementByXpath(allURLs[key].username).value = params.userName;
              // getElementByXpath(allURLs[key].password).focus();
              getElementByXpath(allURLs[key].password).value = params.password;
              getElementByXpath(allURLs[key].login).click();
            }
            else {
              var inputs = document.getElementsByTagName("input");
              for (var i = 1; i < inputs.length; i++) {
                if (inputs[i].type == "password") {
                  inputs[i - 1].value = params.userName;
                  inputs[i].value = params.password;
                  break;
                }
              }
            }
            return { success: true, html: document.body.innerHTML };
          } + ')(' + JSON.stringify(someJSON) + ');'
        });
      }).catch(function (error) {
        document.getElementById('pop_msg').innerHTML = "No password found";
        console.log(error);
      });
    });
};

window.onload = () => {
  if (localStorage.getItem('user')) {
    try {
      token = localStorage.getItem('user')
      token = JSON.parse(token)
      if ('access' in token) {
        fd = new FormData()
        fetch(API + '/authenticate/jwt/verify/', {
          headers: {
            Authorization: `token ${token.access}`
          },
          method: 'POST',
          body: fd
        }).then(res => {
          if (res.status == 401) {
            window.location.href = 'login.html'
          }
        })
      }
      else {
        window.location.href = 'login.html'
      }
    } catch (error) { }
  }
  else {
    window.location.href = 'login.html'
  }
}


function startup() {
  video = document.getElementById('webcamVideo')
  canvas = document.getElementById('canvas')
  photo = document.getElementById('photo')
  startbutton = document.getElementById('startbutton')
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    console.log(url);
  });

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      video.srcObject = stream
      video.play()
    })
    .catch(function (err) {
      console.log('An error occurred: ' + err)
    })

  video.addEventListener(
    'canplay',
    function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width)

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4 / 3)
        }
        video.setAttribute('width', width)
        video.setAttribute('height', height)
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)
        streaming = true
      }
    },
    false,
  )

  startbutton.addEventListener(
    'click',
    function (ev) {
      takepicture(console.log("in pic"));
      setTimeout(async function () {
        await takepicture();
      }, 1000);
      setTimeout(async function () {
        await takepicture();
      }, 1000);
      ev.preventDefault();
    },
    false,
  )
}

// Capture a photo by fetching the current contents of the video
// and drawing it into a canvas, then converting that to a PNG
// format data URL. By drawing it on an offscreen canvas and then
// drawing that to the screen, we can change its size and/or apply
// other changes before drawing it.

function takepicture() {
  var context = canvas.getContext('2d')
  if (width && height) {
    canvas.width = width
    canvas.height = height
    context.drawImage(video, 0, 0, width, height)
    console.log(canvas)
    console.log(context)
    data = canvas.toDataURL('image/png')
  } else {
    console.log('No photo detected')
  }
  var fdata = new FormData()
  var dataURI = data
  var imageData = dataURItoBlob(dataURI)
  fdata.append('image', imageData, '123.png')
  fetch(API + '/upload/', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token.access}`,
    },
    body: fdata,
  }).then(res => res.json()).then(res => {
    var auth = JSON.parse(JSON.stringify(res))
    if (auth.match.Success === true) {
      document.getElementById('pop_msg').innerHTML = "Authorised"
      autofill()
    }
    else {
      document.getElementById('pop_msg').innerHTML = "Not Authorised. Please use PIN"
    }
  }).catch((error) => {
    document.getElementById('pop_msg').innerHTML = "Some issue occured in sending your data!"
    console.log(error)
  })
}
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1])
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var buffer = new ArrayBuffer(byteString.length)
  var data = new DataView(buffer)
  for (var i = 0; i < byteString.length; i++) {
    data.setUint8(i, byteString.charCodeAt(i))
  }
  return new Blob([buffer], { type: mimeString })
}
// Set up our event listener to run the startup process
// once loading is complete.
window.addEventListener('load', startup, false)

logout.onclick = async function () {
  var fdata = new FormData()
  fdata.append('refresh', token.refresh)
  await fetch(API + '/logout/', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token.access}`,
    },
    body: fdata,
  }).then(() => {
    console.log('Logout successfull')
  })
  localStorage.removeItem('user')
  window.location.href = 'login.html'
}

function patterncheck() {
  var fdata = new FormData()
  fdata.append('image', imageData, '123.png')
  fetch(API + '/upload/', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token.access}`,
    },
    body: fdata,
  }).then(res => res.json()).then(res => {
    var auth = JSON.parse(JSON.stringify(res))
    if (auth.match == "Authorised") {
      autofill()
    }
  }).catch((error) => {
    console.log(error)
  })
}

setTimeout(async function () {
  await takepicture();
}, 1000);
