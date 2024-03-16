module.exports =  function(grunt){
    grunt.initConfig({//método que configura as tarefas GRUNT;
        //lê e armazena informações JSON
        pkg: grunt.file.readJSON('package.json'),
        //PROPRIERDADE LESS
        less: {
            //AMBIENTE DE DESENVOLVIMENTO
            development:{
                files:{//arquivo saída : arquivo entrada
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            //AMBIENTE DE PRODUÇÃO
            production: {
                options:{
                    compress:true,
                },
                files:{//arquivo saída : arquivo entrada
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        //PRORIEDADE WATCH
        watch: {
            less:{
                files:['src/styles/**/*.less'],
                tasks:['less:development']
            },
            html:{
                files:['src/index.html'],
                tasks:['replace:dev']
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                           //Estamos trocando o conteúdo disso...
                            match: 'ENDERECO_DO_CSS',
                            //...por isso.
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                //arquivos que serão processados pela tarefa
                files:[
                    {
                        expand: true,
                        //copia todos os arquivos para o diretório-destino
                        flatten: true,
                        //arquivo de origem processado
                        src: ['src/index.html'],
                        //diretório-destino
                        dest: 'dev/'
                    }
                ]
            },
            dist:{
                options:{
                    patterns:[
                        {
                           //Estamos trocando o conteúdo disso...
                            match: 'ENDERECO_DO_CSS',
                            //...por isso.
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js' //saída
                        }
                    ]
                },
                //arquivos que serão processados pela tarefa
                files:[
                    {
                        expand: true,
                        //copia todos os arquivos para o diretório-destino
                        flatten: true,
                        //arquivo de origem processado
                        src: ['prebuild/index.html'],
                        //diretório-destino
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'prebuild/index.html':'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js':'src/scripts/main.js'
                }
            }
        }
    })

    //Função que carrega plugin GRUNT
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify')
    //Função que cria tarefas específicas
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build',['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}
