const state = {
	left: false,
	right: false,
	up: false,
}

export default {
	state:state,
	setup() {
		document.body.addEventListener('keydown', function(e) {
	    	if(e.keyCode == 37 || e.keyCode == 65){
	    		state.left = true;
	    	}
	    	if(e.keyCode == 39 || e.keyCode == 68){
	    		state.right = true;
	    	}
		});
		document.body.addEventListener('keyup', function(e) {
		    if(e.keyCode == 37 || e.keyCode == 65){
	    		state.left = false;
	    	}
	    	if(e.keyCode == 39 || e.keyCode == 68){
	    		state.right = false;
	    	}
		});
	}
}
