# Instavets #


### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Media Files ###

In order for the media url to work a set up is needed in url.py main file. See the code bellow:
In the Templates context_processors OPTIONS
`'django.template.context_processors.media'`
In the main URL.py
`from django.conf.urls.static import  static
from django.conf import settings `
`urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)`
