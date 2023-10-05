# Scalbi

Scalbi is a library dedicated to monitoring and improving server performance. Scalbi uses CTMFS (Connection tree for multiple files simultaneously) technology, developed exclusively for Scalbi.

## 📦 How to install
To install Scalbi, you can use 'go get', here's how:
```bash
go get https://github.com/simplyYan/Scalbi
```
### Scalbi's JavaScript API
To use the full power of Scalbi, you need to add its API to your HTML:
```
https://cdn.jsdelivr.net/gh/simplyYan/Scalbi@main/javascript.api/scalbi.js
```

## 📖 Documentation
To access the documentation, you can use the ScalbiWiki, [by clicking here](https://github.com/simplyYan/Scalbi/wiki/Docs) or by going to:
```
https://github.com/simplyYan/Scalbi/wiki/Docs
```

## 🎯 Main features

- **Get values:** With Scalbi you can get data from forms more easily and quickly.

- **Flexible:** Scalbi can be used with any framework, such as Echo, Fiber, Neo, Gin, and the standard Go framework.

- **Fast:** Faster, lighter and more effective than other methods.

- **Declarative rendering:** Scalbi has extremely easy and effective declarative rendering.

- **More secure:** Your page's source code is less visible and vulnerable.

## ⚡ How CTMFS works
CTMFS takes all the files from your server (which you must indicate) and creates a single network that can load your entire site faster in just one directory/slug.
For example, suppose you have 3 files, called: "home.html, login.html, about.html" in this case, you could create an instance in Go with Scalbi indicating these files and you could access them for example like this: "http://localhost:3030/#home", in the same way with "#login" and "#about".
This way, your website/server loads faster and in a more flexible and secure way.

> By Wesley Yan Soares Brehmer
