# Learn Git by Building an SQL Reference Object

List of Sections:

<!-- TOC -->

- [Introduction to git](#introduction-to-git)
- [Add File to Git](#add-file-to-git)
- [Git commit](#git-commit)
- [Commit History](#commit-history)
- [View changes](#view-changes)
- [Git Branches](#git-branches)
- [Merge Branch](#merge-branch)
- [Delete Branch](#delete-branch)
- [Git rebase](#git-rebase)
- [Git rebase conflict](#git-rebase-conflict)
- [Git stash](#git-stash)
- [Remove or Undo a Commit](#remove-or-undo-a-commit)
- [git ignore](#git-ignore)
- [Final Commits](#final-commits)

<!-- /TOC -->

---

## Introduction to git

Use `git init` to initialize a git repository. `git status` can be used to see the status of where you are.

It's common to have a `main` branch where your production code might be, and other branches for adding new features or fixing bugs.

You can create a new branch and go to it with `git checkout -b new_branch`. The `-b` stands for 'branch'.


```console
codeally@02df92597e8a:~/project$ mkdir sql_reference
codeally@02df92597e8a:~/project$ cd sql_reference/
codeally@02df92597e8a:~/project/sql_reference$ git init
Initialized empty Git repository in /home/codeally/project/sql_reference/.git/
codeally@02df92597e8a:~/project/sql_reference$ ls
codeally@02df92597e8a:~/project/sql_reference$ ls -a
.  ..  .git
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
codeally@02df92597e8a:~/project/sql_reference$ git checkout -b main
Switched to a new branch 'main'
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
codeally@02df92597e8a:~/project/sql_reference$ touch README.md
codeally@02df92597e8a:~/project/sql_reference$ echo SQL Reference >> README.md
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)
```

---

## Add File to Git

The `README` we created has not been added to git yet so it is showing that it is untracked.

First you need to add a file to the staging area with `git add file_name`.

To add all files you can use `git add .`

```console
codeally@02df92597e8a:~/project/sql_reference$ git add README.md 
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
```

Now that the `README` is in the staging it will be added with the next commit.

```console
codeally@02df92597e8a:~/project/sql_reference$ touch sql_reference.json
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        sql_reference.json
```

We now have one file in staging and one that is untracked.

```console
codeally@02df92597e8a:~/project/sql_reference$ git add sql_reference.json 
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
        new file:   sql_reference.json
```

---

## Git commit

To commit files you can use `git commit -m "commit message"`. The `-m` stands for 'message'. Often times the first commit of a repo will have the message 'Initial commit'.

Commit messages often start with `fix:` or `feat:`, among others, to help people understand what your commit was for.

```console
codeally@02df92597e8a:~/project/sql_reference$ git commit -m "Initial commit"
[main (root-commit) 5e8da1f] Initial commit
 2 files changed, 1 insertion(+)
 create mode 100644 README.md
 create mode 100644 sql_reference.json
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch main
nothing to commit, working tree clean
```

---

## Commit History

You can see your commit history with `git log`.

You can use the `--oneline` flag to condense commits down to one line to make it easier to read for when there are many commits.

You can see a specific number of previous commits with `-#`, where `#` is the number of commits you want to see.

```console
codeally@02df92597e8a:~/project/sql_reference$ git log
commit 5e8da1f8dc80afaff0578c9046c9047cafa85362 (HEAD -> main)
Author: Squibs <zachary.r.holman@gmail.com>
Date:   Wed Nov 2 15:08:20 2022 +0000

    Initial commit
```

---

## View changes

You can view changes you have made with `git diff`.

```console
codeally@02df92597e8a:~/project/sql_reference$ git diff
diff --git a/sql_reference.json b/sql_reference.json
index e69de29..d2a52a9 100644
--- a/sql_reference.json
+++ b/sql_reference.json
@@ -0,0 +1,5 @@
+{
+  "database": {
+    "create": "CREATE DATABASE database_name;"
+  }
+}
```

---

## Git Branches

You can use `git branch` to view the current branches in your repo.

You can make a new branch with `git branch branch_name`. Branches often start with `fix/` or `feat/`, among others, like commit messages.

New branches will be a clone of the branch you are on when you create it; having the same code and commit history.

To switch branches you can use `git checkout branch_name`.

```console
codeally@02df92597e8a:~/project/sql_reference$ git branch
* main
codeally@02df92597e8a:~/project/sql_reference$ git branch feat/add-create-table-reference
codeally@02df92597e8a:~/project/sql_reference$ git branch
  feat/add-create-table-reference
* main
codeally@02df92597e8a:~/project/sql_reference$ git checkout feat/add-create-table-reference
Switched to branch 'feat/add-create-table-reference'
codeally@02df92597e8a:~/project/sql_reference$ git branch
* feat/add-create-table-reference
  main
```

You don't want to make commits directly to the main branch of a repo. You generally want to make changes to a secondary branch then merge them into the `main` branch when they are ready.

---

## Merge Branch

You can merge branches by moving to the branch you want to merge another branch into and using `git merge branch_name`.

```console
codeally@02df92597e8a:~/project/sql_reference$ git merge feat/add-create-table-reference
Updating 09b4294..1a9ea87
Fast-forward
 sql_reference.json | 3 +++
 1 file changed, 3 insertions(+)

codeally@02df92597e8a:~/project/sql_reference$ git log --oneline
1a9ea87 (HEAD -> main, feat/add-create-table-reference) feat: add create table reference
09b4294 feat: add drop database reference
9174378 feat: add create database reference
5e8da1f Initial commit
```

---

## Delete Branch

You can delete a branch with `git branch -d branch_name` the `-d` stands for 'delete'.

```console
codeally@02df92597e8a:~/project/sql_reference$ git branch feat/add-create-table-reference -d
Deleted branch feat/add-create-table-reference (was 1a9ea87).
codeally@02df92597e8a:~/project/sql_reference$ git branch
* main
```

---

## Git rebase

If changes are made to the `main` branch you need to update your branch so it has the same commits from `main`, but you can't just merge that branch into this one. You need the commits to be in the same order as it is on `main`.

To do this you need to `rebase` the branch against the `main` branch. `git rebase main`.

You can go to an interactive rebase with the `--interactive` flag.

```console
codeally@02df92597e8a:~/project/sql_reference$ git log --oneline
14f34ab (HEAD -> feat/add-column-references) feat: add column reference
00c9878 feat: add drop table reference
18f0344 feat: add create table reference
684afe7 feat: add drop database reference
a5de944 feat: add create database reference
a029be1 Initial commit
codeally@02df92597e8a:~/project/sql_reference$ git rebase main
First, rewinding head to replay your work on top of it...
Applying: feat: add column reference
Using index info to reconstruct a base tree...
M       sql_reference.json
Falling back to patching base and 3-way merge...
Auto-merging sql_reference.json
codeally@02df92597e8a:~/project/sql_reference$ git log --oneline
ee73b68 (HEAD -> feat/add-column-references) feat: add column reference
e8eb9f8 (main) fix: create table syntax
00c9878 feat: add drop table reference
18f0344 feat: add create table reference
684afe7 feat: add drop database reference
a5de944 feat: add create database reference
a029be1 Initial commit
```

---

## Git rebase conflict

Rebase conflicts can arise when the same lines you changed and committed were changed on the `main` branch. So it tried to add the commit, but could not because something was already there.

```console
codeally@02df92597e8a:~/project/sql_reference$ git rebase main
First, rewinding head to replay your work on top of it...
Applying: feat: add column reference
Using index info to reconstruct a base tree...
M       sql_reference.json
Falling back to patching base and 3-way merge...
Auto-merging sql_reference.json
CONFLICT (content): Merge conflict in sql_reference.json
error: Failed to merge in the changes.
Patch failed at 0001 feat: add column reference
hint: Use 'git am --show-current-patch' to see the failed patch
Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".
```

There are sections separated by `<`, `>`, and `=`. That represent the commit you are on `HEAD` and the commit that is trying to be added `feat: add column reference`.

```
{
  "database": {
    "create": "CREATE DATABASE database_name;",
    "drop": "DROP DATABASE database_name;"
  },
  "table": {
    "create": "CREATE TABLE table_name();",
    "drop": "DROP TABLE table_name;"
  },
<<<<<<< HEAD
  "row": {
    "insert": "INSERT INTO table_name(columns) VALUES(values);"
=======
  "column": {
    "add": "ALTER TABLE table_name ADD COLUMN column_name;"
>>>>>>> feat: add column reference
  }
}
```

You can fix this conflict by removing the `<`, `>` and `=` and making the JSON object valid again.

```
{
  "database": {
    "create": "CREATE DATABASE database_name;",
    "drop": "DROP DATABASE database_name;"
  },
  "table": {
    "create": "CREATE TABLE table_name();",
    "drop": "DROP TABLE table_name;"
  },
  "row": {
    "insert": "INSERT INTO table_name(columns) VALUES(values);"       
  },
  "column": {
    "add": "ALTER TABLE table_name ADD COLUMN column_name;"   
  }
}
```

Checking status, it says we are still in the middle of rebasing and a file needs to be merged still.

```console
codeally@02df92597e8a:~/project/sql_reference$ git status
rebase in progress; onto 0d9ad1f
You are currently rebasing branch 'feat/add-column-references' on '0d9ad1f'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Unmerged paths:
  (use "git restore --staged <file>..." to unstage)
  (use "git add <file>..." to mark resolution)
        both modified:   sql_reference.json

no changes added to commit (use "git add" and/or "git commit -a")
```

Add the file to staging

```console
codeally@02df92597e8a:~/project/sql_reference$ git add .
codeally@02df92597e8a:~/project/sql_reference$ git status
rebase in progress; onto 0d9ad1f
You are currently rebasing branch 'feat/add-column-references' on '0d9ad1f'.
  (all conflicts fixed: run "git rebase --continue")

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   sql_reference.json
```

Says `all conflicts fixed: run "git rebase --continue". Run that command

```console
codeally@02df92597e8a:~/project/sql_reference$ git rebase --continue
Applying: feat: add column reference
Applying: feat: add drop column reference
Using index info to reconstruct a base tree...
M       sql_reference.json
Falling back to patching base and 3-way merge...
Auto-merging sql_reference.json
```

The `rebase` conflict is now resolved and the branch can now be merged or can be continued to be worked on.

---

## Git stash

If you make changes accidentally on the wrong branch, you can put the changes aside with `git stash`.

```console
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch feat/add-insert-row-reference
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   sql_reference.json

no changes added to commit (use "git add" and/or "git commit -a")
codeally@02df92597e8a:~/project/sql_reference$ git stash
Saved working directory and index state WIP on add-insert-row-reference: 0d9ad1f feat: add insert row reference
codeally@02df92597e8a:~/project/sql_reference$ git status
On branch feat/add-insert-row-reference
nothing to commit, working tree clean
```

You can view the things you have stashed with `git stash list`

```console
codeally@02df92597e8a:~/project/sql_reference$ git stash list
stash@{0}: WIP on add-insert-row-reference: 0d9ad1f feat: add insert row reference
```

You can bring changes back with `git stash pop`, which will remove the most recent stash and apply it to your working tree.

```console
codeally@02df92597e8a:~/project/sql_reference$ git stash pop
On branch feat/add-insert-row-reference
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   sql_reference.json

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (5e67ea3f26aa9ace47b7d7958b68f38f10630c02)
```

You can view a condensed version of the stashed changes with `git stash show`

```console
codeally@02df92597e8a:~/project/sql_reference$ git stash show
 sql_reference.json | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
```

You can view the full changes for the latest stash with `git stash show -p`, `-p` stands for 'patch'.

```console
codeally@02df92597e8a:~/project/sql_reference$ git stash show -p
diff --git a/sql_reference.json b/sql_reference.json
index f39cf0a..b2920bd 100644
--- a/sql_reference.json
+++ b/sql_reference.json
@@ -8,6 +8,7 @@
     "drop": "DROP TABLE table_name;"
   },
   "row": {
-    "insert": "INSERT INTO table_name(columns) VALUES(values);"
+    "insert": "INSERT INTO table_name(columns) VALUES(values);",
+    "update": "UPDATE table_name SET column_name = new_value WHERE condition;"
   }
 }
```

You can add the latest stash while keeping it in the stash list with `git stash apply`.

```console
codeally@02df92597e8a:~/project/sql_reference$ git stash apply
On branch feat/add-insert-row-reference
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   sql_reference.json

no changes added to commit (use "git add" and/or "git commit -a")
```

You can drop a specific stash with `git stash drop <stash_name>`. Or the most recent stash with `git stash drop`.

```console
codeally@02df92597e8a:~/project/sql_reference$ git stash drop
Dropped refs/stash@{0} (3da663ba97448ba2c70c0e982be4c47842b55774)
```

---

## Remove or Undo a Commit

You can 'travel back in time' with `git reset` to travel to any point in your commit history. The current `HEAD` is a reference to the last commit you just made.

When you `reset` to one commit before `HEAD` it removes the most recent commit and puts all the changes in the working tree.

If you used the `--hard` flag with the rest, the changes would have not been added to the working tree.

If you used the `--soft` flag the changes would have been added to the working tree and to staging.

Reverting is a good way to undo a commit because you don't lose the commit from the history. You can revert the most recent commit `HEAD` with `git revert HEAD`.

---

## git ignore

You can ignore files by adding them to a file called `.gitignore` simply list the name of the file or directory.

## Final Commits

```console
codeally@02df92597e8a:~/project/sql_reference$ git log --oneline
f86839d (HEAD -> main) feat: add .gitignore and sample.env
6287984 fix: add missing rename references
7e65f27 feat: add column references
87db07c feat: add delete row reference
a72acea feat: add update row reference
88989a2 feat: add insert row reference
d3609d2 fix: create table syntax
0ae0bd4 feat: add drop table reference
18f0344 feat: add create table reference
684afe7 feat: add drop database reference
a5de944 feat: add create database reference
a029be1 Initial commit
codeally@02df92597e8a:~/project/sql_reference$ git log
commit f86839d36ebd2b7125fd85adae4149add71cd07e (HEAD -> main)
Author: Squibs <zachary.r.holman@gmail.com>
Date:   Wed Nov 2 17:37:53 2022 +0000

    feat: add .gitignore and sample.env
    
    feat: add .gitignore
    
    feat: add sample.env

commit 6287984899c57452b5cbe7ab551329c6be8f86fd
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 22:47:21 2021 -0500

    fix: add missing rename references
    
    fix: add missing rename database reference
    
    fix: add missing rename table reference

commit 7e65f2708c1a091762aecae4ac4c978f91b6ae0a
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 22:04:50 2021 -0500

    feat: add column references
    
    feat: add drop column reference
    
    feat: add rename column reference
    
    feat: add primary key reference
    
    feat: add foreign key reference

commit 87db07c94a4273df4de2aa89b756d605f558fc05
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 22:43:17 2021 -0500

    feat: add delete row reference

commit a72aceaad172418b6ac8f2e0db44c6e9bc45483e
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 22:32:31 2021 -0500

    feat: add update row reference

commit 88989a27ab2087f3aea1515c6f8ab4253f384a34
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 22:15:07 2021 -0500

    feat: add insert row reference

commit d3609d2b8047c0d7da867b65072151d8eb69484e
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 22:08:00 2021 -0500

    fix: create table syntax

commit 0ae0bd456114d57c6587643a47a9e3399d2ad88d
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 22:00:29 2021 -0500

    feat: add drop table reference

commit 18f0344599cd58dd4b0d2c54baaa6fb4a6a35523
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 21:55:50 2021 -0500

    feat: add create table reference

commit 684afe786ecb33e590f7dd03d9d53b6b7770684d
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 21:51:05 2021 -0500

    feat: add drop database reference

commit a5de9441f554604a1418a7ea46d836ea9ca09613
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 21:48:34 2021 -0500

    feat: add create database reference

commit a029be197bbd18f51b3ec6647391739d2928415e
Author: moT01 <20648924+moT01@users.noreply.github.com>
Date:   Thu Sep 9 21:44:23 2021 -0500

    Initial commit
```
