# [MYOB Styleguide](http://cmsdev.myob.com.au/bootstrap/)

MYOB styleguide is a front-end environment to create, optimise and test all features which help to build the MYOB website.
It's a source of truth for the online team and anyone within the internal network.

## Installation and Setup

* Clone the repo: `git clone git@gitlab.www.myob.priv:online/styleguide.git`.
* Install with [npm](https://www.npmjs.com): `npm install`.

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
styleguide/
├── config/
├── frontend/
│   ├── _js
│   │   └── libs
│   ├── _sass
│   │   ├── components
│   │   └── _main.scss
│   └── _fonts
├── templates/
│   └── _includes
└── test/
```

## Documentation

MYOB's styleguide is built with [Jekyll](http://jekyllrb.com), [Bootstrap-SASS](https://github.com/twbs/bootstrap-sass), [Gulp](http://gulpjs.com), [Angular](https://angularjs.org/) and [Browsersync](https://www.browsersync.io).