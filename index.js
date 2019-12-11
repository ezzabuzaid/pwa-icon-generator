
const fs = require('fs');
var Jimp = require('jimp');

class Link {
    constructor({ size, type, rel = 'icon', showSizes = true, relName = 'rel' }) {
        this.size = size;
        this.rel = rel;
        this.type = type
        this.sizes = `${this.size}x${this.size}`;
        this.relName = relName;
        this.showSizes = showSizes;
    }

    pathToIcon() {
        return `./icons/icon-${this.sizes}.png`
    }

    generateLinkTag() {
        const sizesString = this.showSizes ? `sizes="${this.sizes}"` : '';
        const typeString = this.type ? `type="${this.type}"` : '';
        return `<link ${this.relName}="${this.rel}" ${typeString} ${sizesString} href="${this.pathToIcon()}">`
    }

}

const LinkRel = {
    IE: 'msapplication-TileImage',
    CHROME: 'icon',
    APPLE: 'apple-touch-icon'
};

const sizes = [
    new Link({ size: 192, type: 'image/png', showSizes: false }),
    new Link({ size: 144, rel: LinkRel.IE, relName: 'name', type: 'image/png', showSizes: false }),
    new Link({ size: 192, rel: LinkRel.APPLE, showSizes: false }),
    new Link({ size: 16, type: 'image/png', }),
    new Link({ size: 32, type: 'image/png', }),
    new Link({ size: 96, type: 'image/png', }),
    new Link({ size: 128, type: 'image/png', }),
    new Link({ size: 192, type: 'image/png', }),
    new Link({ size: 256, type: 'image/png', }),
    new Link({ size: 384, type: 'image/png', }),
    new Link({ size: 512, type: 'image/png', }),
    new Link({ size: 57, rel: LinkRel.APPLE }),
    new Link({ size: 60, rel: LinkRel.APPLE }),
    new Link({ size: 72, rel: LinkRel.APPLE }),
    new Link({ size: 76, rel: LinkRel.APPLE }),
    new Link({ size: 120, rel: LinkRel.APPLE }),
    new Link({ size: 128, rel: LinkRel.APPLE }),
    new Link({ size: 144, rel: LinkRel.APPLE }),
    new Link({ size: 152, rel: LinkRel.APPLE }),
    new Link({ size: 167, rel: LinkRel.APPLE }),
    new Link({ size: 180, rel: LinkRel.APPLE }),
    new Link({ size: 192, rel: LinkRel.APPLE }),
    new Link({ size: 256, rel: LinkRel.APPLE }),
    new Link({ size: 384, rel: LinkRel.APPLE }),
    new Link({ size: 512, rel: LinkRel.APPLE }),
];


class IOSSplashscreen {
    constructor({ width, height, deviceWidth, deviceHeight, orientation = 'landscape' }) {
        this.width = width;
        this.height = height;
        this.deviceWidth = deviceWidth;
        this.deviceHeight = deviceHeight;
        this.orientation = orientation;
    }

    pathToIcon() {
        return `./icons/splash-${this.width}x${this.height}.png`
    }


    generateLingTagForSplashScreenInIOS() {
        return `<link rel="apple-touch-startup-image"
        media="screen and (device-width: ${this.deviceWidth}px) and (device-height: ${this.deviceHeight}px) and (-webkit-device-pixel-ratio: 2) and (orientation: ${this.orientation})"
        href="./icons/splash-${this.width}x${this.height}.png" />`
    }

}

const ios_splashscreen = [
    new IOSSplashscreen({ width: 1136, height: 640, deviceWidth: 320, deviceHeight: 568 }),
    new IOSSplashscreen({ width: 640, height: 1136, deviceWidth: 320, deviceHeight: 568, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 2436, height: 1125, deviceWidth: 375, deviceHeight: 812 }),
    new IOSSplashscreen({ width: 1125, height: 2436, deviceWidth: 375, deviceHeight: 812, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 1792, height: 828, deviceWidth: 414, deviceHeight: 896 }),
    new IOSSplashscreen({ width: 828, height: 1792, deviceWidth: 414, deviceHeight: 896, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 1334, height: 750, deviceWidth: 375, deviceHeight: 667 }),
    new IOSSplashscreen({ width: 750, height: 1334, deviceWidth: 375, deviceHeight: 667, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 2208, height: 1242, deviceWidth: 414, deviceHeight: 736 }),
    new IOSSplashscreen({ width: 1242, height: 2208, deviceWidth: 414, deviceHeight: 736, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 1242, height: 2688, deviceWidth: 414, deviceHeight: 896 }),
    new IOSSplashscreen({ width: 2688, height: 1242, deviceWidth: 414, deviceHeight: 896, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 2732, height: 2048, deviceWidth: 1024, deviceHeight: 1366 }),
    new IOSSplashscreen({ width: 2048, height: 2732, deviceWidth: 1024, deviceHeight: 1366, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 2224, height: 1668, deviceWidth: 834, deviceHeight: 1112 }),
    new IOSSplashscreen({ width: 1668, height: 2224, deviceWidth: 834, deviceHeight: 1112, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 2388, height: 1668, deviceWidth: 834, deviceHeight: 1194 }),
    new IOSSplashscreen({ width: 1668, height: 2388, deviceWidth: 834, deviceHeight: 1194, orientation: 'portrait' }),

    new IOSSplashscreen({ width: 2048, height: 1536, deviceWidth: 768, deviceHeight: 1024 }),
    new IOSSplashscreen({ width: 1536, height: 2048, deviceWidth: 768, deviceHeight: 1024, orientation: 'portrait' }),
]

const iconPath = './logo.png';
const pwaLink = 'pwa.html';
console.log('generating different icons sizes');
sizes.forEach((link) => {
    const linkFileName = link.pathToIcon();
    console.log(linkFileName);
    Jimp.read(iconPath)
        .then(logo => {
            fs.appendFileSync(pwaLink, link.generateLinkTag());
            return logo
                .resize(link.size, link.size)
                .write(linkFileName);
        }, err => console.error(err));
});

console.log('generating different splashscreen sizes');
ios_splashscreen.forEach((splash) => {
    const splashFileName = splash.pathToIcon(splash.width, splash.height);
    console.log(splashFileName);
    Jimp.read(iconPath)
        .then(logo => {
            fs.appendFileSync(pwaLink, splash.generateLingTagForSplashScreenInIOS());
            return logo
                .resize(splash.width, splash.height)
                .write(splashFileName);
        }, err => console.error(err));
});
