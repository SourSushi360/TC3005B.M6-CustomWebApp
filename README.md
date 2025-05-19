# Coding with direnv

Coding has always been a pain in the ass because you need to install a lot of dependencies for even the most simple coding assignment. This is solved easily with the use of nix flakes and direnv.

## How to use it?

You just need to make a copy of this directory using `cp -r --no-preserve=all /etc/nixos/modules/direnv/ new/route`, update flake.nix with the correct packages, enter the directory and use `$direnv allow`.
Afterwards, the needed packages will download and you will be able to use them only when inside your working directory.

## How does it work?

You will create inside your working directory a file .envrc with the following content:

```
# .envrc
use flake
```

This file will make direnv call the flake.nix file, which will have instructions to download the packages you need and use them while inside the working directory.
