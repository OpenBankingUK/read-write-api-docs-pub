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


## Deploy

Deployment is achieved using github actions to copy the generated html files into github pages branch, making it live.

Check file [.github/workflows/deploy.yml](.github/workflows/deploy.yml) for details on CI/CD pipeline.
