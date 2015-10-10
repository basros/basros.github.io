(function(){
  var me = window.location.host.split('.')[0];
  document.title = me + ' | GitHub Pages'
  var app = angular.module('landingPage', []);

  app.controller('BookmarkController', function($http){
    var self = this;
    $http.get('bookmarks.json').success(function(data) {
      self.bookmarks = data;
    });
  });
  
  app.controller('RepoController', function($http){
    var self = this;
    $http({method: 'GET', url: 'https://api.github.com/users/'+me+'/repos'}).then(
      function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        self.repos = response.data;
        $('#repoQueryInput').focus();
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
        $('#gistQueryInput').focus();
      }, function errorCallback(response) {
        console.log('failed to load my github gists');
      }
    );
  });  
  
  app.controller('TabController', function(){
    this.tab = 2;
    this.isSet = function(isSet){
      return this.tab === isSet;
    };
    this.setTab = function(setTab){
      this.tab = setTab;
    };
  });

})();
