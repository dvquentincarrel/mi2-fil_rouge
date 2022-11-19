function make_nav(data, current){
	var nav = document.getElementsByTagName("nav")[0]
	nav.innerHTML = ""
	for(i = 0; i < data.length; i++){
		div = document.createElement("div")
		link = document.createElement("a")
		//link.href = data[i].link
		link.href = "#"
		link.setAttribute("onclick", "inject_page(pages, '"+data[i].name+"', '"+data[i].text+"')")
		link.innerHTML = data[i].text
		if(current == data[i].text){
			link.id = "current_page"
		}
		div.appendChild(link)
		if(data[i].submenu){
			ul = document.createElement("ul")
			ul.classList.add("drop_down")
			for(j = 0; j < data[i].submenu.length; j++){
				li = document.createElement("li")
				sublink = document.createElement("a")
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

function make_table(data){
	// Does what it says, parsing data, a dict of lists describing the content of the table
	table = document.getElementsByTagName("table")[0]

	// Header
	tr = document.createElement("tr")
	for(i = 0; i < data['th'].length; i++){
		td = document.createElement("th")
		td.innerHTML = data['th'][i]
		tr.appendChild(td)
	}
	td = document.createElement("th")
	tr.appendChild(td)
	table.appendChild(tr)

	// Rows
	for(i = 0; i < data['td'].length; i++){
		add_row(data['td'][i], table)
	}
}

function add_row(row, table){
	tr = document.createElement("tr")
	for(j = 0; j < row.length; j++){
		td = document.createElement("td")
		if(j == 1){
			// If it's the picture
			img = document.createElement("img")
			img.src = row[j]
			td.appendChild(img)
		}else{
			td.innerHTML = row[j]
		}
		tr.appendChild(td)
	}
	td = document.createElement("td")
	btn = document.createElement("button")
	btn.innerHTML = "Agrandir"
	btn_del = document.createElement("button")
	btn_del.innerHTML = "Supprimer"
	btn_del.setAttribute('onclick' ,"this.parentElement.parentElement.remove()")
	btn_mod = document.createElement("button")
	btn_mod.innerHTML = "Modifier"
	btn_mod.setAttribute('onclick' ,"modify_row(this)")
	td.appendChild(btn)
	td.appendChild(document.createElement("br"))
	td.appendChild(btn_del)
	td.appendChild(document.createElement("br"))
	td.appendChild(btn_mod)
	td.appendChild(document.createElement("br"))
	tr.appendChild(td)
	table.appendChild(tr)
}

function get_fields_data(){
	let nom = document.getElementById("nm")
	let photo = document.getElementById("photo")
	let poste = document.getElementById("pst")
	let description = document.getElementById("dsc")
	let data = [nom.value, photo.value, poste.value, description.value]
	empty_fields()
	return data
}

function empty_fields(){
	let nom = document.getElementById("nm").value = ""
	let photo = document.getElementById("photo").value = ""
	let poste = document.getElementById("pst").value = ""
	let description = document.getElementById("dsc").value = ""
}

function new_row(){
	table = document.getElementsByTagName("table")[0]
	data = get_fields_data()
	for(i = 0; i < data.length; i++){
		// if not all fields are filled
		if(data[i] == ""){
			alert("Tous les champs ne sont pas remplis")
			return 1;
		}
	}
	add_row(data, table)
}

function modify_row(elem){
	console.log(elem)
	let description = elem.parentElement.previousElementSibling
	console.log(description)
	let poste = description.previousElementSibling
	let photo = poste.previousElementSibling
	let nom = photo.previousElementSibling
	let data = get_fields_data()
	console.log(data)
	description.innerHTML = data[3]
	poste.innerHTML = data[2]
	photo.innerHTML = data[1]
	nom.innerHTML = data[0]
	console.log(description)
}

function inject_page(pages, page, nav_name){
	make_nav(nav, nav_name)
	let anchor = document.getElementById("anchor")
	anchor.innerHTML = pages[page]
	if(page == 'joueurs'){
		make_table(joueurs)
	}
}
