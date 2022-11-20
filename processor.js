

function make_nav(data, current){
	let nav = document.getElementsByTagName("nav")[0]
	nav.innerHTML = ""
	for(i = 0; i < data.length; i++){
		let div = document.createElement("div")
		let link = document.createElement("a")
		//link.href = data[i].link
		link.href = "#"
		link.setAttribute("onclick", "inject_page(pages_json, '"+data[i].name+"', '"+data[i].text+"')")
		link.innerHTML = data[i].text
		if(current == data[i].text){
			link.id = "current_page"
		}
		div.appendChild(link)
		if(data[i].submenu){
			let ul = document.createElement("ul")
			ul.classList.add("drop_down")
			for(j = 0; j < data[i].submenu.length; j++){
				let li = document.createElement("li")
				let sublink = document.createElement("a")
				sublink.href = (data[i].submenu[j].link) ? data[i].submenu[j].link : "#"
				sublink.innerHTML = data[i].submenu[j].text
				li.appendChild(sublink)
				ul.appendChild(li)
			}
			div.appendChild(ul)
		}
		nav.appendChild(div)
	}
}

function make_player_widgets(){
	for(i = 0; i < joueurs_data.length; i++){
		let container = document.createElement("div")

		let name = document.createElement("p")
		name.innerHTML = joueurs_data[i][0]
		container.appendChild(name)

		let desc = document.createElement("p")
		desc.innerHTML = joueurs_data[i][3]
		container.appendChild(desc)

		let img = document.createElement("img")
		img.setAttribute('src', joueurs_data[i][1])
		container.appendChild(img)

		let poste = document.createElement("p")
		poste.innerHTML = joueurs_data[i][2]
		container.appendChild(poste)

		let btns = document.createElement("div")
		let btn_1 = document.createElement('button')
		btn_1.innerHTML = 'Modifier'
		btn_1.setAttribute('onclick', 'mod_player(this);update_widgets()')
		btns.appendChild(btn_1)
		let btn_2 = document.createElement('button')
		btn_2.innerHTML = 'Supprimer'
		btn_2.setAttribute('onclick', 'del_player(this);update_widgets()')
		btns.appendChild(btn_2)
		container.appendChild(btns)

		let id = document.createElement("p")
		id.innerHTML = joueurs_data[i][4]
		id.style.display = "none"
		container.appendChild(id)

		document.getElementsByTagName('table')[0].appendChild(container)
	}
}

function update_widgets(){
	document.getElementsByTagName('table')[0].innerHTML = ''
	make_player_widgets()
}

function mod_player(elem){
	let row_id = elem.parentNode.parentNode.lastChild.innerHTML
	let counter = 0
	let row_index = 0
	joueurs_data.filter((val, index, arr) => {
		if(row_id == val[4]){
			row_index = index
		}
	})
	
	joueurs_data[row_index][0] = document.querySelector('#nm').value 
	joueurs_data[row_index][1] = document.querySelector('#photo').value 
	joueurs_data[row_index][2] = document.querySelector('#pst').value 
	joueurs_data[row_index][3] = document.querySelector('#dsc').value
}

function del_player(elem){
	let row_id = elem.parentNode.parentNode.lastChild.innerHTML
	joueurs_data = joueurs_data.filter((val, index, arr) => {
		return val[4] != row_id
	})
}

function add_player_widget(){
	let new_data = []
	let name = document.querySelector('#nm').value 
	new_data.push(name)
	let photo = document.querySelector('#photo').value 
	new_data.push(photo)
	let pst = document.querySelector('#pst').value 
	new_data.push(pst)
	let dsc = document.querySelector('#dsc').value 
	new_data.push(dsc)
	joueurs_data.push(new_data)
}

function inject_page(pages, page, nav_name){
	// Loads a page content into the current web page
	make_nav(nav_json, nav_name)
	let anchor = document.getElementById("anchor")
	let sel_page = pages[page]
	anchor.innerHTML = sel_page['content']
	if(sel_page['callback'] != ""){
		eval(sel_page['callback'])
	}
}
