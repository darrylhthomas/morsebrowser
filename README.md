# morse_browser

What is this?

Basically my own customized version of https://morsecode.world/international/trainer/generator.html (and by the way, 
please note that the text-to-sound is handled by .js libraries available here: https://github.com/scp93ch/morse-pro)

If you just want to use it: https://randyloeb.github.io/morsebrowser/index.html

or, download the /dist directory and open index.html in your browser.

I cobbled it together using knockout.js because I think knockout is fairly approachable by amateur programmer hams,
compare to other javascript frameworks. If it ever got to the point that react or angular made sense, it's doing too much!
I just want this to be a simple utility!

With respect to the morse-pro library, don't ask me why I converted some to typescript. I later just decided to let webpack
create a bundle and call it a day. 2/5/22-Removed ts stuff.

npx webpack --config webpack.config.js
