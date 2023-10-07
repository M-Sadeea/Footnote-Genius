const FootnoteGenius = {
  footnotes : [],
  
  containers : {},

  backIcon : '<svg width="30" height="15" viewBox="0 0 26.676 26.676" ><path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562C26.18,21.891,26.141,21.891,26.105,21.891z"/></svg>',

  init(){
    this.footnotes = document.querySelectorAll('sup.html-footnote');
    [].forEach.call(document.querySelectorAll('.html-footnotes-container'), con=>{
      let group = con.dataset.fnGroup || 'default';
      let brackets;
      if (this.containers[group]) 
        this.containers[group]['el'] = con;
      else {
        let b = con.dataset.fnBrackets || '';

        if (b.toLowerCase() == 'false' )
          brackets = ['',''];
        else if (b != '' && b.length > 1)
          brackets = b.split('').slice(0,2);
        else 
          brackets = ['(',')'];
        
        this.containers[group] = {
          el : con,
          indexStyle : con.dataset.fnIndexStyle || 'default',
          brackets ,
          lastIndex : 1,
        };
        if(con.dataset.fnCreateLinks !== undefined)
          this.containers[group].createLinks = true;

        if(con.dataset.fnCreateReturnLinks !== undefined)
          this.containers[group].createReturnLinks = true;
      }
    });

    [].forEach.call(this.footnotes, (fn, i)=>this.addFootnote(fn, i))
  },

  addFootnote(fn){
    let group = fn.dataset.fnGroup || 'default';
    if(!this.containers[group]) {
      console.log('Wrong data-fn-group!', fn);
      return;
    }
    let index = this.getLastIndex(group);
    let item = this.createItem(index, fn.innerHTML);
    this.containers[group].el.appendChild(item);
    fn.setAttribute('title', fn.innerHTML) ;
    fn.innerHTML = (this.containers[group].createLinks) 
        ? `<a id="footnotes-link-${index.group}-${index.id}" href="#${item.id}">${index.text}</a>`
        : index.text;
  },

  getLastIndex(group){
    let style = this.containers[group].indexStyle;
    let i = this.containers[group].lastIndex++;
    let ob = this.containers[group].brackets[0];
    let cb = this.containers[group].brackets[1];
    let index;
    switch (style) {
      case 'ab':
        index = this.getLetterList(i);
        break;

      case 'AB':
        index = this.getLetterList(i).toUpperCase();
        break;

      case 'i':
        index = this.getRomanList(i);
        break;

      case 'I':
        index = this.getRomanList(i).toUpperCase();
        break;

      case '*':
        index = this.getStars(i);
        break;
    
      default:
        index = i;
    }
    return {
      id: i ,
      text : ob + index + cb,
      group
    }
  },

  createItem(index, content){
    let el = document.createElement('P');
    el.id = 'footnotes-item-' + index.group + '-' + index.id;
    el.classList.add('html-footnotes-item');

    let indexEl = document.createElement('SPAN');
    indexEl.classList.add('html-footnotes-item__index');
    indexEl.innerHTML = index.text + '. ';

    
    let contentEl = document.createElement('SPAN');
    contentEl.classList.add('html-footnotes-item__content');
    contentEl.innerHTML = content;
    
    el.appendChild(indexEl);
    el.appendChild(contentEl);

    if(this.containers[index.group].createReturnLinks == true){
      let returnEl = document.createElement('a');
      returnEl.classList.add('html-footnotes-item__link');
      returnEl.setAttribute('href', '#' + 'footnotes-link-' + index.group + '-' + index.id)
      returnEl.innerHTML = this.backIcon;
      el.appendChild(returnEl);
    }

    return el;
  },

  getStars(i){
    let stars = ""
    for (let j = 0; j < i; j++) {
      stars += '*';
    }
    return stars;
  },

  getLetterList(i){
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let list = bnds(i);
    let res = "";
    for (let j = 0; j < list.length; j++) {
      res += letters[list[j]];
    }
    return res;

    function bnds(i){
      let base = 26;
      if (i<=base) return [i-1];
      i--;
      let n = Math.floor(i/base);
      return [...bnds(n), i%base];
    }
  },

  getRomanList(i) {
    let romans = [{letter: 'M', value: 1000},
                  {letter: 'CM', value: 900},
                  {letter: 'D', value: 500},
                  {letter: 'CD', value: 400},
                  {letter: 'C', value: 100},
                  {letter: 'XC', value: 90},
                  {letter: 'L', value: 50},
                  {letter: 'XL', value: 40},
                  {letter: 'X', value: 10},
                  {letter: 'IX', value: 9},
                  {letter: 'V', value: 5},
                  {letter: 'IV', value: 4},
                  {letter: 'I', value: 1}
                ],
        roman = '',
        j;
    for (let j = 0; j < romans.length; j++) {
      let letter = romans[j].letter,
          val = romans[j].value;
      while ( i >= val ) {
        roman += letter;
        i -= val;
      }
    }

    return roman;
  }
}