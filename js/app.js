let app = angular.module("samen", ["ngRoute"]);

app.config(function($routeProvider,$locationProvider){

	$routeProvider.when('/',{
		templateUrl : 'view/login.html',
		
	})
	.when('/home',{
		templateUrl : 'view/home.html',
		controller: 'homeCtrl'
	})
	.when('/pesan',{
		templateUrl : 'view/pemesanan.html',
		controller: 'pesanCtrl'
	})
	.when('/riwayat',{
		templateUrl : 'view/riwayat.html',
		controller: 'riwayatCtrl'
	})
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	})
})

app.controller('homeCtrl',['$scope', function($scope){
	$scope.gems = []
	$scope.init = function(){
		let existingGems = localStorage.getItem('data')
		if(existingGems === null){
			existingGems = []
		}
		else {
			existingGems = JSON.parse(existingGems)
		}
		$scope.gems = existingGems;
	}
	$scope.init()
}])

app.directive("singleGem", function(){
	return {
		templateUrl : 'view/satuProduk.html',
		scope: {
			gemData: '='
		},
		controller: 'homeCtrl'
	}
})



app.controller('pesanCtrl',['$scope', function($scope,$rootScope){
	$scope.makans = []

	$scope.init2 = function(){
		let existingGems = localStorage.getItem('data')
		if(existingGems === null){
			existingGems = []
		}
		else {
			existingGems = JSON.parse(existingGems)
		}
		$scope.makans = existingGems;
	}

	$scope.init2()
	
	
	
	$scope.newGem = {}
	$scope.addGem = function(){
		let existingGems = localStorage.getItem('history')
		if(existingGems === null){
			existingGems = []
		}
		else{
		
			existingGems = JSON.parse(existingGems)

		}

		// existingGems.push($scope.newGem)
		$scope.newGem.total = $scope.newGem.produk.price * $scope.newGem.banyak;
				existingGems.push({
					product: $scope.newGem.total,
					product: $scope.newGem
				})
			
	
	
		localStorage.setItem('history',JSON.stringify(existingGems))
		$scope.resetForm()
	}

	$scope.resetForm = function(){
		$scope.newGem.firstnama = ''
		$scope.newGem.lastname = ''
		$scope.newGem.phone = ''
		$scope.newGem.gedung = ''
		$scope.newGem.lantai = ''
		$scope.newGem.ruang = ''
		$scope.newGem.namaMakanan = ''
		$scope.newGem.banyak = ''
		$scope.newGem.submakan = ''
		

		
	}
	
}])


// app.directive("makanan", function(){
// 	return {
// 		templateUrl : 'view/makanan.html',
// 		scope: {
// 			makanData: '='
// 		},
// 		controller: 'pesanCtrl'
// 	}
// })

app.controller('riwayatCtrl',['$scope', function($scope){
	$scope.his = []
	$scope.histOrder = function(){
		let existingGems = localStorage.getItem('history')
		if(existingGems === null){
			existingGems = []
		}
		else {
			existingGems = JSON.parse(existingGems)
		}
		$scope.his = existingGems;
	}
	$scope.histOrder()
}])


app.controller('login',function($scope,$location,$rootScope){
	
	$scope.user={'username':'','password':''};
	
	//----- Users json
	var validUsers= [ 
	{'username':'a', 'password':'a'}
	];
	
	$scope.showError = false; // set Error flag
	$scope.showSuccess = false; // set Success Flag

	//------- Authenticate function
	$scope.authenticate = function (){
		
		
		for(var i in validUsers){ // loop on users array
			if($scope.user.username == validUsers[i].username && $scope.user.password == validUsers[i].password){
				
				$location.path('/home')
				flag = true;
				$rootScope.loggedIn= true;
				break;
			}
			
		}

		//-------- set error or success flags
		if(flag){
			$scope.showError = false;
			$scope.showSuccess = true;
		}
		else{
			$scope.showError = true;
			$scope.showSuccess = false;
		}


	}
	
	$scope.logout = function(){
		$rootScope.loggedIn= false;
		alert('Success!')
		$location.path('/')
		
	}


});