# Read Write API Specifications

Read Write API Specifications project source 

This is using Github pages for public facing website

## Project structure

All specification documents are written in markdown and under the folder `docs/`

The markdown specification files are used as source to convert into html and then put somewhere public facing. 
We're using github pages to release documentation to public.

## Development

### Requirements

- node
- yarn 
- vuepress (installed by yarn)

### Content

Content is a mix of markdown files and other assets like images. Found in folder `docs/`. 
Vuepress documentation has details on how to use.

### Branches

- `master` contains the source used to generate the live website
- `develop` contains work in progress before publishing, example a new version 3.1.9

### Setup

To set up this project:

Clone the repo

```sh
git clone git@github.com:OpenBankingUK/read-write-api-docs-pub.git
```

Install all node dependencies:

```sh
yarn install --non-interactive
```

### Running locally

Run the following command and open your browser at `http://:8080/read-write-api-docs-pub/` to see the generated website.

```sh
yarn docs:dev
```

## Building

Running the script `build.sh` will generate all HTML in `docs/.vuepress/dist/` folder. 

```sh
./build.sh
```

### Staging
There is no staging environment at the moment. If you really need to pre-publish follow these steps:

- Create a repository that will host the staging github pages ex: `site3`
- Change vuepress config file, property base to the name of the new repository ex: base: '/site3/'
- Generate the content with yarn docs:build
- Copy the generated content in docs/.vuepress/dist to the new repository on branch gh-pages
- Enable github pages on the new repository, and it should become visible the website

### Manual checks

- Verify links on left navigation menu work
- Verify that images are not broken
- General website style looks normal and all aligned

## Deploy

Deployment is done on a separate repository 

- Generate the HTML with `./build.sh`
- Checkout branch `gh-pages` on repository `https://github.com/OpenBankingUK/read-write-api-site3`
- Copy the content of `docs/.vuepress/dist/` on this repository to `read-write-api-site3` repository branch `gh-pages`
- Push force, and it will be published under `https://openbankinguk.github.io/read-write-api-site3/`
