import * as UniversalLexer from 'universal-lexer'
// const UniversalLexer = require('universal-lexer')

const Utils = {
    anlayze: (code) => {
        return new Promise((resolve, reject) => {
            console.log("::::::::::::::::::::::::::::::::::")
            // const inputCode = UniversalLexer.build(code)
            // const inputCode = UniversalLexer.buildFromFile('rules.yaml')
            const lexer = UniversalLexer.compileFromFile('rules.yaml')
            // const res = lexer(code)
    
            console.log(res)
            resolve()
        })
    },
}

export default Utils