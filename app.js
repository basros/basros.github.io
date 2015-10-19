(function(){
  var me = window.location.host.split('.')[0];
  document.title = me + ' | GitHub Pages'
  var app = angular.module('landingPage', []);

  app.controller('BookmarkController', function($http){
    var self = this;
    $http.get('bookmarks.json').success(function(data) {
      self.bookmarks = data;
      $('#googleQueryInput').focus();
    });

    $('#googleQueryInput').keypress(function(e) { // http://stackoverflow.com/a/979686/3449673
    if(e.which == 13) {
      $('#googleQueryBtn')[0].click(); // http://stackoverflow.com/a/12801548/3449673
    }
});
  });
  
  app.controller('RepoController', function($http){
    var self = this;
    $http({method: 'GET', url: 'https://api.github.com/users/'+me+'/repos'}).then(
      function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        self.repos = response.data;

        // above API call doesn't tell the sources of forks, so...
        self.repos.forEach(function(repo){
          if(repo.fork){
            $http.get('https://api.github.com/repos/'+me+'/'+repo.name).success(function(data) {
              repo.source = data.source.html_url;
            });
          }
        });

        // attach the click event to a static element as the list is not there yet
        $("body").on("click", ".forkedFromLink", function(e){
          e.preventDefault();
          e.stopPropagation();
          console.log('fooo!bar!');
          window.location = $(e.currentTarget).data('link');
        });

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('failed to load my github repos');
      }
    );
  });  
  
  app.controller('GistController', function($http){
    var self = this;
    $http({method: 'GET', url: 'https://api.github.com/users/'+me+'/gists'}).then(
      function successCallback(response) {
        self.gists = response.data;
      }, function errorCallback(response) {
        console.log('failed to load my github gists');
      }
    );
  });  
  
  app.controller('TabController', function(){
    this.tab = 1;
    this.isSet = function(isSet){
      return this.tab === isSet;
    };
    this.setTab = function(setTab){
      this.tab = setTab;
    };
  });

})();
