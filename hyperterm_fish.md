# Hyperterm, Fish, Atom

## Install both.
Open Hyperterm, We need to change some settings. We want it to use fish instead of bash/zsh.
cmd+, will open the config file in your favorite editor. I don't have an `$EDITOR` set. so it can not open the config file.

```
$ which fish
/usr/local/bin/fish
$ atom ~/.hyperterm.js
```

In that file look for config: shell property and set the value to your path to fish.
```
config: {
  shell: '/usr/local/bin/fish'
}
```

Now all new tabs will start using the fish shell.
Now that we have the shell we want, we need to setup our `$EDITOR` so `cmd+,` will work.
```
~> set -U EDITOR atom
```

The one last thing, my hostname and all that is long. `chrisrichards@Chriss-MacBook-Pro ~>`. I want a shorter prompt. We could use our editor to add the fish_prompt function. This is the function called to render the prompt.

```
~> ~/.config/fish/functions/fish_prompt.fish
```

Fish also has a very nice web based config.
```
~> fish_config
```
