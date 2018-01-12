const path = require('path');
const md = require('markdown-it')();
const pug = require('pug');
const yaml = require('js-yaml');

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
    const templates = {
        main: pug.compileFile(path.join(__dirname, '../templates/main.pug')),
        spec: pug.compileFile(path.join(__dirname, '../templates/spec.pug')),
    };

   
    return markdownRenderFunction;
   
    function markdownRenderFunction(file, outDir, options){
        const target = ctx.getTargetFile(file, outDir);

        return ctx.render(file, target, ()=>{
            return ctx.loadRenderedFile(file, false).then(content=>{
                let tmpname = 'main';
                // 先頭のメタデータを取得
                const r = content.match(/^(?:\/\/.*\n)+/);
                const opt = {
                    ...options,
                };
                if (r != null){
                    const meta = r[0].replace(/^\/\//mg, '');
                    content = content.slice(r[0].length);
                    const metaobj = yaml.safeLoad(meta);
                    if (metaobj != null){
                        Object.assign(opt, metaobj);

                        if (metaobj.template != null){
                            tmpname = metaobj.template;
                        }
                    }
                }
                opt.content = md.render(content);
                return Promise.resolve(templates[tmpname](opt));
            });
        });
    }
}
