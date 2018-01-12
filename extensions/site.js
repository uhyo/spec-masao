const myst = require('my-static');

const staticExts = [
    '.js',
    '.css',
    '.png',
    '.json5',
];

module.exports = (context)=>{
    context.addUnknownExtensionHook((context, ext)=>{
        // copy static files
        if (staticExts.includes(ext)){
            return myst.renderUtil.makeStaticRenderer(context);
        }
        return null;
    });
};
