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
	.when('/about',{
		templateUrl : 'view/tentang.html',
		
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
		$scope.keranjangs = []
		$scope.carts = []
		$scope.test = []
		$scope.total=0;
		let i = 0;
	$scope.cartOrder = function(index){
		let existingGems = localStorage.getItem('data')
		
		
		if(existingGems === null){
			existingGems = []
		}
		else {
			existingGems = JSON.parse(existingGems)
		}
		
		$scope.carts.nama = existingGems[index].nama;
		$scope.carts.price = existingGems[index].price;
		$scope.total= ($scope.total + existingGems[index].price);
		$scope.test.push({
					nama: $scope.carts.nama,
					price: $scope.carts.price,
					total: $scope.total,

					product: $scope.newGem
				})
	
		localStorage.setItem('carts',JSON.stringify($scope.test))
		localStorage.setItem('history',JSON.stringify($scope.test))
		
		$scope.keranjangs = $scope.test
		
		

	}
	$scope.newGem = {}
	$scope.newGem2 ={}

	$scope.addGem = function(){
		let existingGems = localStorage.getItem('history2')
		let existingGems2 = localStorage.getItem('carts')
		if(existingGems === null || existingGems2 === null){
			existingGems = []
			existingGems2 = []
		}

		else{
			$scope.newGem.produk.price;
			existingGems = JSON.parse(existingGems)
			existingGems2 = JSON.parse(existingGems2)
		}
		
			
		 $scope.newGem.total = ($scope.newGem.produk.price * $scope.newGem.banyak);
				existingGems.push({
					product: $scope.newGem.total,
					product: $scope.newGem
				})
			
	
			// existingGems2.push({
			// 		product: $scope.newGem2.total,
			// 		product: $scope.newGem2.nama,
			// 		product: $scope.newGem2.price
			// 	})
	
		localStorage.setItem('history',JSON.stringify(existingGems))
		localStorage.setItem('history2',JSON.stringify(existingGems))
		alert("Pesanan sedang diproses oleh penjual dan pesanan sudah tersimpan di Riwayat pemesanan. Mohon Harap Tunggu pesanan Anda Terima Kasih.")
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
				 $rootScope.checkboxModel = {
       value1 : false,
       
     };
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