module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,
    // path to the clientlib root folder (output)
    clientLibRoot: "./../ui.apps/src/main/content/jcr_root/apps/aemreact/clientlibs",
    libs: {
        name: "react-app",
        allowProxy: true,
        categories: ["aemreact.react"],
        serializationFormat: "xml",
        jsProcessor: ["min:gcc"],
        assets: {
            js: [
                "build/static/**/*.js"
            ],
            css: [
                "build/static/**/*.css"
            ]
        }
    }
}