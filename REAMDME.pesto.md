# The Preact Nebulix

Why this repo ?

* We liked the [Nebulix Template](https://github.com/unfolding-io/nebulix.git)
* But we quickly determined that

From the [Nebulix Template](https://github.com/unfolding-io/nebulix.git), we started from the following git commit :

```bash

$ git clone git@github.com:unfolding-io/nebulix.git .
Cloning into '.'...
remote: Enumerating objects: 825, done.
remote: Counting objects: 100% (291/291), done.
remote: Compressing objects: 100% (115/115), done.
remote: Total 825 (delta 214), reused 186 (delta 175), pack-reused 534
Receiving objects: 100% (825/825), 44.00 MiB | 2.46 MiB/s, done.
Resolving deltas: 100% (383/383), done.

$ git rev-parse HEAD
aed8cd81816bb9c83287dc887acaac74ff655255

```

We created a git tag on the master git branch `0.0.0` :

```bash
git add -A && git commit -m "add https://github.com/unfolding-io/nebulix.git source code commit [aed8cd81816bb9c83287dc887acaac74ff655255]" && git push -u origin master

git tag 0.0.0 -m "https://github.com/unfolding-io/nebulix.git source code commit [aed8cd81816bb9c83287dc887acaac74ff655255]" && git push -u origin --tags


git flow init --defaults

git flow feature start vue/to/preact/migration && git push -u origin --all


```
data-astro-cid-kwx2m7ql