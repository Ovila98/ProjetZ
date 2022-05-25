/**
 * @name addGlobalEventListener
 * 
 * @param {string} type 
 * @param {string} selector 
 * @param {function} callback 
 */
export function addGlobalEventListener(type, selector, callback){
    document.addEventListener(type, e => {
        if(e.target.matches(selector)){
            callback(e);
        }
    })
}

/**
 * @name qs
 * 
 * @param {string} selector 
 * @returns {Element}
 */
export function qs(selector){
    return document.querySelector(selector);
}

/**
 * @name qsa
 * 
 * @param {string} selector 
 * @returns {NodeListOf<Element>}
 */
export function qsa(selector){
    return document.querySelectorAll(selector);
}

export function closeModal(){
    window.location.hash = "";
    window.history.replaceState("", "", window.location.pathname)
    }

export function openModal(){
    window.location.hash = "#authentication"
}

export function closeSidebar(e){
    const sidebar = document.querySelector('aside');
    const menuBtn = document.querySelector("#menu-btn");
    if (window.matchMedia("(max-width: 1280px)").matches){
      sidebar.dataset.state = "close";
      menuBtn.textContent = "\u2162";
    } 
}

export function toggleSidebar(e){
    const sidebar = document.querySelector('aside');
    const menuBtn = document.querySelector("#menu-btn")
    if (window.matchMedia("(max-width: 1280px)").matches){
      sidebar.dataset.state = sidebar.dataset.state === "close" ? "open" : "close"
      menuBtn.textContent = sidebar.dataset.state === "close" ? "\u2162" : "\u2A09"
    } 
}

export function setupSalonStickyTabs(){

    const main = qs("#main-content")

    const tabs = document.querySelector("#tab-links-search");
    const sticky = tabs.offsetTop;

    main.onscroll = function() {
        
        if (main.scrollTop >= sticky - 64) {
            tabs.classList.add("sticky")
        } else {
            tabs.classList.remove("sticky");
        }
    }

};

export function getURLSegments(URL){
    const regex = /\/(\w+)/g
    const segements = URL.match(regex)
    
    return segements
}

export function getGroupType(arr){
    const type = arr.find((element, i, arr) => arr.at(i-1) === "/chats")
    return type.split("/").at(-1)
}

export function setCurrentSubjectType(type){
    window.localStorage.setItem("currentSubjectType", type);
}

export function capitalize(str){
    if(str.length > 1) return str.charAt(0).toUpperCase() + str.slice(1);
    
    return str.toUpperCase();
}

export function groupTypeToCollection(type){
    return `${capitalize(type)}Chats`
}

export function getMessagesIntoView(){
    const msgEl = qs("#messages-container")?.querySelector('.message-element:last-of-type')
    if(msgEl) msgEl.scrollIntoView(false);
}