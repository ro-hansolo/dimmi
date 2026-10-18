# Dimmi

Dimmi is a free, offline speech-to-text app for macOS. Press a shortcut, speak, and your words are typed into whatever app you're using.

Dimmi is a reskin of **[Handy](https://github.com/cjpais/Handy) by [CJ Pais](https://github.com/cjpais)**. The engine, models and features are all Handy's. Dimmi only changes the look so it feels more at home on macOS. If you find it useful, please [support Handy](https://handy.computer).

## Install

Download the latest `.dmg` from [Releases](https://github.com/ro-hansolo/dimmi/releases).

Dimmi is not notarized by Apple, so macOS will block the first launch. To open it anyway, right-click **Dimmi.app** → **Open** → **Open**. If that doesn't work, run:

```sh
xattr -dr com.apple.quarantine /Applications/Dimmi.app
```

## Docs

Features, settings, troubleshooting and building from source work the same as in Handy. See the [Handy README](../README.md).

## Staying in sync with Handy

```sh
git fetch upstream
git merge upstream/main
node scripts/rebrand.mjs   # re-applies the Dimmi name to any new strings
```

## License

MIT, same as Handy. See [LICENSE](../LICENSE).
