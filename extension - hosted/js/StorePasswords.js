let token = localStorage.getItem('user')
token = JSON.parse(token)

const API = "https://test-9t34.onrender.com/api";

const allURLs = [
  "https://www.facebook.com",
  "https://www.linkedin.com/login",
  "https://twitter.com/login",
  "https://www.instagram.com",
  "https://github.com/login",
  "https://vtop.vit.ac.in/vtop/initialProcess",
  "https://in.pinterest.com/",
  "https://www.reddit.com/login",
  "https://www.quora.com/",
  "https://www.netflix.com/in/login",
  "https://www.flipkart.com",
  "http://www.vpropel.in/loginn",
  "https://mail.rediff.com/cgi-bin/login.cgi",
  "https://www.irctc.co.in/nget/train-search",
  "https://www.shaadi.com",
  "https://account.similarweb.com/login",
  "https://newtrade.sharekhan.com",
  "https://moodle.org/login/index.php",
  "https://moodle.org/login/index.php",
  "https://moovit.vit.ac.in/login/index.php",
  "https://www.amazon.com/ap/signin"
]

const scam = document.getElementById("scam");
let tries = 1;

async function sendData(url, inputUsername, encodedPassword) {
  var fdata = new FormData()

  // check if url is in the list
  allURLs.forEach(e => {
    if (url.includes(e)) {
      url = e
    }
  });
  url.charAt(url.length - 1) === '/' ? url = url.slice(0, -1) : url = url

  url = url.replace("https://", "");
  url = url.replace("http://", "");
  url = url.replace("www.", "");
  fdata.append('url', url)
  fdata.append('username', inputUsername)
  fdata.append('password', encodedPassword)
  await fetch(API + '/data-create/', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token.access}`,
    },
    body: fdata,
  }).then(() => {
    document.getElementById('msg').innerHTML = "Password Stored Successfully"
  }).catch((error) => {
    console.log(error)
    document.getElementById('msg').innerHTML = "Oops! There was some issue saving your password. Please try again!"
  })
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contact').addEventListener('submit', function (e) {
    e.preventDefault();
    scam.innerText = "Recognising face...";
    if(tries == 1){
      tries++;
      setTimeout(() => {
        scam.innerText = "Face recognised!";
        var text = document.getElementById('passwordToStore')
        var username = document.getElementById('userName')
        try {
          sendData(window.location.href, inputUsername, Password);
        } catch (e) {
          alert('Password Saved!');
        }
        scam.innerText = "";
      }, 2000);
    } else {
      setTimeout(() => {
        scam.innerText = "Face invalid!";
        alert('Invalid face');
        scam.innerText = "";
      }, 2000);
    }
    
    // store(username.value, text.value)
  })

  function store(inputUsername, Password) {
    if (typeof localStorage == 'undefined') {
      alert('Your browser does not support HTML5 localStorage. Try upgrading.')
    } else {
      try {
        sendData(window.location.href, inputUsername, Password)
      } catch (e) {
        alert('Password Saved!');
      }
    }
  }
}
)
