define(['helpers','popup','livestamp','text!templates/popups.html', 'mustache'], function (helpers,popup,Mustache) {
	 "use strict";
    var realtimePages;
    
    realtimePages = {
        buildDetail: function (m, stepList) {
        	
            try {
        	
                  var obj = JSON.parse(m);
            		      
                 $.each(obj, function (key, value) {
                  	
                  	// update timing table
                  	var startTime = value.times[0];
                  	var endTime = value.times[1];
 					
                  	var resultTxt = value.text;	
            		    	
                  			// timetable
		                    var myInt = setInterval(function() {
						    	helpers.startTimer($('#elapsedTimeJs'), startTime);
						    },1000);

							if (endTime) { 
								// If the build is finished
								clearInterval(myInt);        
								// get the rest of the content
								if(!window.location.hash) {
							        window.location = window.location + '#finished';
							        window.location.reload();
									
								}
								sock.close();

							} 

							// build steps
		                    var i = 0;
		                    
		                  	$.each(value.steps, function (key, value) {
		                  		
		                  		 var isStarted = value.isStarted;
		                  		 var isFinished = value.isFinished === true;
		                  		 var isRunning = isStarted && !isFinished;
		                  		 var startTime = value.times[0];
		                  		 var endTime = value.times[1];
		                  		 var resultsClass = helpers.getResult(value.results[0]);
		                  		 var isHidden = value.hidden === true;

		                  		 if (isHidden != true) {
		                  		 	
		                  			i = ++i;
		                  			 
			                  		// update step list if it's not finished
		                  		

		                  				if (isRunning) {
		                  					
		                  					// loop through the logs
		                  					
		                  					var hasLogs = value.logs.length > 0; 
		                  					var hasUrls = value.urls.length > 0; 
		                  					
		                  					if (hasLogs) {
		                  						
		                  						var logList = '';  
		                  						$('.logs-txt',stepList).eq(i-1).text('Logs');
					                  			$.each(value.logs, function (key, value) {
					                  				var logText = value[0];
					                  				var logUrl = value[1];
					                  				logList += '<li class="s-logs-js"><a href='+ logUrl +'>'+ logText +'</a></li>';	
					                  			});
					                  			$('.log-list-js',stepList).eq(i-1).html(logList);
				                  			}
											// loop through urls
											if (hasUrls) {
					                  			var urlList = '';  
												$.each(value.urls, function (key, value) {
													 urlList += '<li class="urls-mod log-list-'+ helpers.getResult(value.results) +'"><a href="'+ value.url +'">'+ key +'</a></li>'; 
												});				                  			
					                  			$('.log-list-js',stepList).eq(i-1).append(urlList);
				                  			}

				                  			//Running text
			                  				
			                  				$('.update-time-js',stepList).eq(i-1).html('Running');
			                  				

			                  				// update build text
		          							$('.s-text-js',stepList).eq(i-1).html(value.text.join(' '));
		          							// update result class
			          						$('.s-result-js',stepList).eq(i-1).removeClass().addClass('running result s-result-js');	
			          						$(stepList).eq(i-1).removeClass().addClass('status-running');
			          						
			              				} else if (isFinished) {
			              					
			              					// Apply the updates from the finished state before applying finished class
			              					
			              					$('.update-time-js',stepList).eq(i-1).html(helpers.getTime(startTime, endTime));
			              					$('.s-result-js',stepList).eq(i-1).removeClass().addClass(resultsClass + ' result s-result-js');					              							              					
			              					$(stepList).eq(i-1).removeClass().addClass('finished status-'+resultsClass);
			              					
			              				}
		              			}
		              			
		                  	});

	                });
				
          		}
             
	            catch(err) {
	            	//console.log(err);
	            }
		           
        },
        buildersPage: function(m, tableRowList) {
			
		  	try {   
		  	    	
	          	var obj = JSON.parse(m);  
	          	
		          	var i = 0;
	          		var objBuilder = obj.builders;
	          		
	          		$.each(objBuilder, function (key, value) {
	          			
	          			var item = $('[id="' + value.name + '"]');
	          			var currentCont = item.find('.current-cont');
	          			var pendingCont = item.find('.pending-cont');
	          			var jobsCont = item.find('.jobs-js');
	          			
	          			var lastRun = item.find('.last-build-js');
	          			var status = item.find('.status-build-js');
	          			 	          					
	          			if (value.pendingBuilds > 0) {	          				
	          				
	          				i = ++i;
	          				var popupBtn = $('<a class="more-info popup-btn-js mod-1" data-rt_update="pending" href="#" data-in="">Pending jobs </a>');
	          				popupBtn.attr('data-in',i -1)	          				
	          				pendingCont
	          					.html(popupBtn)		             			
		    					.children(popupBtn).click(function(e){
		             				e.preventDefault();				        		             						             				
		             				popup.pendingJobs(popupBtn);						             				
		             			});

	          			} else {
	          				pendingCont.html('');
	          			}	          			

	             		if (value.currentBuilds.length > 0 ) {
	             				             		
	             			var htmlLi ='';
	             			
	             			var smHead = $('<h2 class="small-head">Current job</h2>');

	             			htmlLi += '<h2 class="small-head">Current job</h2><ul class="list current-job-js">';

	             			var ul = $('<ul class="list current-job-js">');
							
							var nameVal = '';
	             			$.each(value.currentBuilds, function (key, value) {	 								
								$.each(value.currentStep, function (key, value) {
									if (key === 'name') {										
										nameVal = value; 		
									}									
								});	 
								
	             				htmlLi += '<li><a href="'+ value.url +'">'+ value.number +'</a> '+ nameVal +'</li>';
	             			});		             			

	             			htmlLi += '</ul>'

	             			currentCont.html(htmlLi);	
	             			
	             		}
	             		if (value.pendingBuilds === 0 && value.currentBuilds.length === 0) {
		             		currentCont.html('<span class="small-txt"> No jobs </span>');
		             	} 
		             	
		             	if (value.latestBuild) {
			             	$.each(value.latestBuild, function (key, value) {		             			             		
			             		var buildUrl = status.find('.build-url-js')
			             		if (key === 'times') {
			             			var time = helpers.getTime(value[0],value[1]).trim();		             					             			
			             			lastRun.find('.last-run').attr('data-livestamp',value[1]);		             						             			
			             			lastRun.find('.small-txt').html('('+ time +')');
			             			lastRun.find('.hidden-date-js').html(value[1]);			             			
			             		} 		        
			             		if (key === 'text') {		             					             		
			             			status.find('.hide-status-js, .status-text-js').text(value[0]);	
			             		}     		

			             		if (key === 'number') {
			             			buildUrl.text('#'+value)
			             		}

			             		if (key === 'url') {
			             			buildUrl.attr('href',value);	
			             		}			             		
			             	});
		             	}
		             	
	          		});									
	        }
	           catch(err) {
	        	//console.log(err);
	        }
        }, rtBuildSlaves: function(m){
        	
        	try {            		        
          		var obj = JSON.parse(m);  	          	

	          	var i = 0;          		
          		
          		$.each(obj, function (key, value) {          			
          			var item = $('[id="' + value.friendly_name + '"]');		
          			var statusTd = item.find('.status-td');          		          		
          			
					statusTd.html(helpers.getSlavesResult(value.connected, value.runningBuilds));
					statusTd.removeClass().addClass(helpers.getClassName(value.connected, value.runningBuilds));				
          		});
            }
            catch(err) {
            }
        }, rtBuildqueue: function(m){
        	
        	try {            		        

            }
            catch(err) {
            }
        }
    }
    return realtimePages
});