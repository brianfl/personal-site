Vue.createApp({
	delimiters: ['[[',']]'],
	data(){
		return {
			piece_locations: {},
			 pieces: ["X", "R"],
			squares: ['81','82','83','84','85','86','87','88',
				'71','72','73','74','75','76','77','78',
				'61','62','63','64','65','66','67','68',
				'51','52','53','54','55','56','57','58',
				'41','42','43','44','45','46','47','48',
				'31','32','33','34','35','36','37','38',
				'21','22','23','24','25','26','27','28',
				'11','12','13','14','15','16','17','18'],
			is_selected: {},
		};
	},

	created: function(){
		for (var sq of this.squares){
			this.is_selected[sq] = false
		}

		for (var sq of this.squares){
			this.piece_locations[sq] = ''
		}

		this.piece_locations['81'] = 'BR1'
		this.piece_locations['82'] = 'BN1'
	},

	methods: {
		swap(){
			this.pieces = [this.pieces[1], this.pieces[0]]
		},
		computedclass(item){
			if (Number(item[0])%2===Number(item[1])%2){
				return 'black'
			} else{
				return 'white'
			}
		},
		squaretext(item){
			var val = this.piece_locations[item]
			if (val!=''){
				if (val=='BR1'){
					return '♜'
				}
				else if (val=='BN1'){
					return '♞'
				} 
			} else{
				return ''
			}
		},
		check_selected(item){
			if (this.is_selected[item]==true){
				return 'selected'
			}
		},
		legitimate_move(present, future, piece){
			var v_p = Number(present[0])
			var h_p = Number(present[1])
			var v_f = Number(future[0])
			var h_f = Number(future[1])
			if (piece[1]=='R'){
				if (v_p == v_f){
					var squares_between = []
					var hl = [h_p, h_f]
					for (var step = Math.min(...hl)+1; step < Math.max(...hl); step++){
						squares_between.push(String(v_p) + String(step))
					}
					for (var sq of squares_between){
						if (this.piece_locations[sq]!==''){
							return false
						}
					}
					return true
				} else if (h_p == h_f){
					var squares_between = []
					var hl = [v_p, v_f]
					for (var step = Math.min(...hl)+1; step < Math.max(...hl); step++){
						squares_between.push(String(step) + String(h_p))
					}
					for (var sq of squares_between){
						if (this.piece_locations[sq]!==''){
							return false
						}
					}
					return true
				}
			} else if (piece[1]=='N'){
				if (v_p+2==v_f || v_p-2==v_f){
					if (h_p+1==h_f || h_p-1==h_f){
						return true
					}
				} else if(v_p+1==v_f || v_p-1==v_f){
					if (h_p+2==h_f || h_p-2==h_f){
						return true
					}
				}
			}
			return false

		},
		clear_selections(){
			for (var sq of this.squares){
				this.is_selected[sq] = false
			}
		},
		handle_click(item){
			if (this.piece_locations[item]!=''){
				this.clear_selections()
				this.is_selected[item]=true		
			}
			else{
				var present_location = Object.keys(this.is_selected).find(key => this.is_selected[key] === true)
				if ( present_location !==undefined){
					var piece = this.piece_locations[present_location]
					if (this.legitimate_move(present_location, item, piece)){
						this.piece_locations[item] = piece
						this.piece_locations[present_location] = ''
					}
				}
				this.clear_selections()
			}
	
		}
	}
}).mount('#app');
