module.exports = {
    template: require('./template.html'),

    data: function() {
        return {
            path: '/',
            files: []
        };
    },
    props: {
        username: {
            type: String,
            requried: true
        },
        repo: {
            type: String,
            requried: true
        }
    },
    created: function(){
        console.log("created ....")
        if (this.username && this.repo) {this.getFiles();}
    },
    methods: {
        getFiles: function(){
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path, function(data){
                this.files = data;
                console.log(this.files)
            });
        },
        changePath: function(path){
            this.path = '/' + path;
            this.getFiles();
        },
        goBack: function(){
            this.path = this.path.split('/').slice(0,-1).join('/');
            if (this.path === '') {this.path = '/';}
            this.getFiles();
        }
    },
    computed: {
        fullRepoUrl: function() {
            return this.username + '/' + this.repo;
        },
        sortedFiles: function() {
            return this.files.slice(0).sort(function(a, b) {

                if (a.type !== b.type) {
                    if (a.type === 'dir') {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {

                    if (a.name < b.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
        },
    },
    watch: {
        repo: function(newVal, oldVal){
            console.log('watch working')
            this.getFiles();
        }
    } 
    
}
