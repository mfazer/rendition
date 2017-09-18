#!/bin/bash

# echos the current git branch
# by Lattapon Yodsuwan (https://gist.github.com/clozed2u)
# via (https://gist.github.com/clozed2u/4971506#file-gistfile1-sh)
git_branch () {
    if git rev-parse --git-dir >/dev/null 2>&1
        #then echo -e "" [$(git branch 2>/dev/null| sed -n '/^\*/s/^\* //p')]
      then echo -e ""$(git branch 2>/dev/null| sed -n '/^\*/s/^\* //p')
    else
      echo ""
    fi
}

set -e # exit with nonzero exit code if anything fails

# get GIT url
if [[ $GIT_URL == "" ]]; then
  GIT_URL=`git config --get remote.origin.url`

  echo "$GIT_URL"
  if [[ $GIT_URL == "" ]]; then
    echo "This project is not configured with a remote git repo."
    exit 1
  fi
fi

GIT_BRANCH="$(git_branch)"

if [[ $GIT_BRANCH != "master" ]]; then
  echo "It appears you are on the branch \"$GIT_BRANCH\". Only the \"master\" branch is allowed to be published."
  exit 1
fi

# clear and re-create the out directory
rm -rf .out || exit 0;
mkdir .out;

# run our compile script, discussed above
build-storybook -o .out

# go to the out directory and create a *new* Git repo
cd .out
git init

# inside this git repo we'll pretend to be a new user
git config user.name "GH Pages Bot"
git config user.email "hello@ghbot.com"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy Storybook to GitHub Pages"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet $GIT_URL master:gh-pages
cd ..
rm -rf .out

echo ""
echo "=> Storybook deployed to: `node .scripts/get_gh_pages_url.js $GIT_URL`"