const path = require('path');
const md = require('markdown-it')();
const pug = require('pug');

module.exports = (context)=>{
    context.addUnknownExtensionHook((context, ext)=>{
        if (ext === '.md') {
            return makeMarkdownRenderFunction(context);
        }
    });
};

/**
 * Make a markdown render function.
 */
function makeMarkdownRenderFunction(ctx){
    // Compile a pug template.
    const templateFunc = pug.compileFile(
        path.join(__dirname, '../templates/main.pug'),
        {
        });

   
    return markdownRenderFunction;
   
    function markdownRenderFunction(file, outDir, options){
        const target = ctx.getTargetFile(file, outDir);

        return ctx.render(file, target, ()=>{
            return ctx.loadRenderedFile(file, false).then(content=>{
                return Promise.resolve(templateFunc({
                    ...options,
                    content: md.render(content),
                }));
            });
        });
    }
}
