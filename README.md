
<center>
<a href="https://swishvinmik.azurewebsites.net/" target="_blank"> <img src="swish-webapp/assets/Group.png" alt="django" width="300" height="300"/> </a>
</center>
<center>

# Swish
> Swish is the smartest way to log in using facial recognition.
</center>

---
<p>
  <a href="https://www.linkedin.com/in/vineet-raj-6a3317200/" target="_blank">
    <img alt="made-vineet" src="https://img.shields.io/badge/MADE%20BY-Vineet-blue?style=for-the-badge" />
  </a>


    
</p>


<a href="https://swishvinmik.azurewebsites.net/">Swish</a> is an extension that recognises a user whenever he/she tries to Log-In any of the accounts. The user who has registered his/her face will only be given the option to access the accounts. The face recognition will be done every time the user tries to access any of the accounts. Option to open the accounts via Pin is also provided. Hence, there is no need to Log-Out every time of the account to keep the data safe. Without any single click you can access your accounts as well as keep the account password protected.

<br>


## Built With
| | | | |
|:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:|
|<a href="https://www.djangoproject.com/" target="_blank"> <img src="https://static.djangoproject.com/img/logos/django-logo-positive.png" alt="django" width="100" height="100"/> </a>|<a href="https://opencv.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/opencv/opencv-ar21.svg" alt="opencv" width="150" height="70"/> </a>| <a href="https://opencv.org/" target="_blank"> <img src="swish-webapp/assets/mediapipe.png" alt="Mediapipe" width="210" height="50"/> </a>| <a href="" target="_blank"><img src="https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-ar21.svg" alt="bootstrap" width="200" height="100" /></a>




## 💪🏻 Features
- Save Password
- Auto-Fill with Facial Recognition 
- PIN Login 



## 👨‍💻 Dependencies
 - Chrome Browser
 - Python 3.8
 - Dlib



## 🏃‍♀️ Getting Started

### Running this app using Docker

You'll need to have [Docker installed](https://docs.docker.com/get-docker/).
It's available on Windows, macOS and most distros of Linux. If you're new to
Docker and want to learn it in detail check out the [additional resources
links](#learn-more-about-docker-and-django) near the bottom of this README.

If you're using Windows, it will be expected that you're following along inside
of [WSL or WSL
2](https://nickjanetakis.com/blog/a-linux-dev-environment-on-windows-with-wsl-2-docker-desktop-and-more).
That's because we're going to be running shell commands. You can always modify
these commands for PowerShell if you want.

#### Clone this repo anywhere you want and move into the directory:

```sh
git clone https://github.com/STCVIT/Swish.git
cd SWISH-SUBMISSION
cd swish-webapp

# Optionally checkout a specific tag, such as: git checkout 0.4.0
```

#### Build everything:

*The first time you run this it's going to take 5-10 minutes depending on your
internet connection speed and computer's hardware specs. That's because it's
going to download a few Docker images and build the Python*

```sh
docker build --tag swish:latest .
```

Now that everything is built. To get the app running use this command.


```sh
docker run --name swish -d -p 8000:8000 swish:latest
```


*We'll go over that `./run` script in a bit!*

#### Check it out in a browser:

Visit <http://localhost:8000> in your favorite browser.

# Check out the hosted link:

Visit <https://swishvinmik.azurewebsites.net/> in your favorite browser.

## Running locally


- Clone the repository
```
git clone https://github.com/vinmik/Swish-Submission 
```
- Install the dependencies
```
pip install -r requirements.txt
```
- Start the server
```
python manage.py runserver
```
#### Setup the initial database:

```sh
./run manage migrate 
```

## 🎍 novelty
* Swish not only authenticates but also autofills as well as logs the user in for a seamless experience

* Swish is compatible with both chrome and edge

* Use of DLIB library for facial recognition ensures optimal accuracy and preprocessed images account for least errors

* Swish webapp is disability responsive (i.e. is accible to people with low or limited vision)  

## ⌛ Future Scope and Development
* IR Sensor input for depth Perception

* Support For Android and IOS based browsers also.
* Incorporating autofill with google autofill or Microsoft authenticator rather than from extension itself.
* Option to store multiple profiles of a face for multi. angle authentication.
* Incorporating decentralized authentication with the help of Block-chain and IPFS. 
* Instead of just autofilling passwords , documents can also be retrieved

---

## ⭐ Show your support

Give a ⭐ if this tool made your life easier!

Spread the word to your geek fellows to save their time!

## ✨ Contributors

## 
<table>
	<tr align="center" style="font-weight:bold">
		<td>
		Vineet Raj
		<p align="center">
			<img src = "https://avatars.githubusercontent.com/u/74700202?v=4" width="150" height="150" alt="Vineet Raj">
		</p>
			<p align="center">
				<a href = "https://github.com/vinmik">
					<img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36" alt="GitHub"/>
				</a>
			</p>
		</td>
	</tr>
	</table>



## 🤝🏻 Connect with Me
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/vinmik_/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vineet-raj-6a3317200/)

---

<p align="center">
	Made with ❤️ for Engage by Vineet Raj 
</p>