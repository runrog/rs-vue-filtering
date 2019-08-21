# Resource Vue Filtering

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start
```

```bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Filter Configuration
The filter config `src/filter-config.json` is what the side bar builds from. When a route loads, for example `/resources`, the filter component will read the route's meta data for the content type (in this case "resources"). It will then grab the resource's filters from this config and create the side bar. It has the following JSON schema:

```json

{
  "resources": {
    "region": [
      "North America",
      ...
    ],
    "type": [
      "Analyst Report",
      ...
    ],
    "solution": [
      "Application Services / DevOps",
      ...
    ],
    "product": [
      "Adobe Experience Manager",
      ...
    ],
    "industry": [
      "Aerospace & Defense",
      ...
    ]
  },
  "events": {
    "something": [],
    "otherThing": []
  }
}
```

The keys you make inside the content type in the example will depend on the data being fetched. The keys need to match the scheme of the cards. For example, resource cards look like this:

```json
{  
   "title":"2017 Magic Quadrant for Public Cloud Infrastructure Managed Service Providers, Worldwide",
   "alias":"/resources/2017-magic-quadrant-public-cloud-infrastructure-managed-service-providers-worldwide",
   "type":"analyst_report",
   "product":"Amazon Web Services (AWS), Google Cloud, Microsoft Azure",
   "solution":"Managed Cloud, Managed Public Cloud",
   "region":"North America",
   "industry":"",
   "header":"<p>2017 Magic Quadrant for Public Cloud Infrastructure Managed Service Providers, Worldwide</p>\n",
   "body":"<p>Rackspace is proud to be recognized as a leader in the 2017 Magic Quadrant for Public Cloud Infrastructure Managed Service Providers, Worldwide</p>\n",
   "cta":"View Resource",
   "background":"http://mte-4798-rest-endpoints.www8.dev.website.rackspace.com/sites/default/files/digital-clouds.jpg"
}
```

As you'll notice in both examples, the keys we _want_ to filter for match each other. They aren't limited, if you wanted to filter for the title, you can also add that to the config.


## Routes
Routes dictate what data is being fetch and from where. Below is an example of our `es` route inside the routes config:

```javascript
{
  path: '/es/resources',
  name: 'resources-es',
  component: require('@/pages/filtered-content/').default,
  meta: {
    lang: 'es',
    content: 'resources',
    format: 'json',
  },
  props: {
    default: true,
  },
},

```

The path would be what you'd see in the url, but the important information to note here is in the meta data. Here we can tell what we want loaded when this url is visited. The entire api url we fetch from is derived from this meta data. See below:
```javascript
`https://endpoint/${lang}/api/${content}?_format=${format}`
```

Content needs to also match the name of the content type in the filter config above so that the side bar knows what to build from.
```
content: resources
```

Lang is used to fetch the correct language from the correct api. If you omit this value it will default to engrish.
```
lang: 'es'
```

Format is used to tell the api url what format we want the data in. This will depend on what is available from the api.
```
format: 'json'
```

## URL Queries (Auto Filtering)
It is possible to auto filter using URL queries using single or multiple values. See below example:
```
/resources?type=analyst report&solution=compliance
```

## Further Vue documentation regarding this app
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
