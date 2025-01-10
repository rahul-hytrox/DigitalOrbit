import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  sidebarBtn!: Element | null;
  sidebar!: Element | null;
  testimonialsItem!: NodeListOf<Element>;
  modalContainer!: Element | null;
  modalCloseBtn!: Element | null;
  overlay!: Element | null;
  modalImg!: HTMLImageElement | null;
  modalTitle!: Element | null;
  modalText!: Element | null;
  select!: Element | null;
  selectItems!: NodeListOf<Element>;
  selectValue!: Element | null;
  filterBtn!: NodeListOf<Element>;
  filterItems!: NodeListOf<Element>;
  form!: HTMLFormElement | null;
  formInputs!: NodeListOf<Element>;
  formBtn!: HTMLButtonElement | null;
  navigationLinks!: NodeListOf<Element>;
  pages!: NodeListOf<Element>;

  constructor() { }

  ngOnInit() { 
    console.log('HomeComponent initialized');

    const elementToggleFunc = function (elem: Element) { elem.classList.toggle("active"); }

    this.sidebar = document.querySelector("[data-sidebar]");
    this.sidebarBtn = document.querySelector("[data-sidebar-btn]");

    if (this.sidebarBtn) {
      this.sidebarBtn.addEventListener("click", () => { if (this.sidebar) elementToggleFunc(this.sidebar); });
    }

    //Activating Modal-testimonial

    this.testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
    this.modalContainer = document.querySelector('[data-modal-container]');
    this.modalCloseBtn = document.querySelector('[data-modal-close-btn]');
    this.overlay = document.querySelector('[data-overlay]');

    this.modalImg = document.querySelector('[data-modal-img]');
    this.modalTitle = document.querySelector('[data-modal-title]');
    this.modalText = document.querySelector('[data-modal-text]');

    const testimonialsModalFunc = () => {
      if (this.modalContainer && this.overlay) {
        this.modalContainer.classList.toggle('active');
        this.overlay.classList.toggle('active');
      }
    }

    for (let i = 0; i < this.testimonialsItem.length; i++) {
      this.testimonialsItem[i].addEventListener('click', () => {
        if (this.modalImg) {
          this.modalImg.src = (this.testimonialsItem[i].querySelector('[data-testimonials-avatar]') as HTMLImageElement).src;
          this.modalImg.alt = (this.testimonialsItem[i].querySelector('[data-testimonials-avatar]') as HTMLImageElement).alt;
        }
        if (this.modalTitle) {
          this.modalTitle.innerHTML = (this.testimonialsItem[i].querySelector('[data-testimonials-title]') as HTMLElement).innerHTML;
        }
        if (this.modalText) {
          this.modalText.innerHTML = (this.testimonialsItem[i].querySelector('[data-testimonials-text]') as HTMLElement).innerHTML;
        }

        testimonialsModalFunc();
      });
    }

    //Activating close button in modal-testimonial

    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', testimonialsModalFunc);
    }

    //Activating Filter Select and filtering options

    this.select = document.querySelector('[data-select]');
    this.selectItems = document.querySelectorAll('[data-select-item]');
    this.selectValue = document.querySelector('[data-select-value]');
    this.filterBtn = document.querySelectorAll('[data-filter-btn]');

    if (this.select) {
      this.select.addEventListener('click', () => { if (this.select) elementToggleFunc(this.select); });
    }

    for (let i = 0; i < this.selectItems.length; i++) {
      this.selectItems[i].addEventListener('click', () => {
        let selectedValue = (this.selectItems[i] as HTMLElement).innerText.toLowerCase();
        if (this.selectValue) {
          (this.selectValue as HTMLElement).innerText = (this.selectItems[i] as HTMLElement).innerText;
        }
        if (this.select) {
          elementToggleFunc(this.select);
        }
        this.filterFunc(selectedValue);
      });
    }

    this.filterItems = document.querySelectorAll('[data-filter-item]');

    //Enabling filter button for larger screens 

    let lastClickedBtn = this.filterBtn[0];

    for (let i = 0; i < this.filterBtn.length; i++) {
      this.filterBtn[i].addEventListener('click', () => {
        let selectedValue = (this.filterBtn[i] as HTMLElement).innerText.toLowerCase();
        if (this.selectValue) {
          (this.selectValue as HTMLElement).innerText = (this.filterBtn[i] as HTMLElement).innerText;
        }
        this.filterFunc(selectedValue);

        if (lastClickedBtn) {
          lastClickedBtn.classList.remove('active');
        }
        this.filterBtn[i].classList.add('active');
        lastClickedBtn = this.filterBtn[i];
      });
    }

    // Enabling Contact Form

    this.form = document.querySelector('[data-form]');
    this.formInputs = document.querySelectorAll('[data-form-input]');
    this.formBtn = document.querySelector('[data-form-btn]');

    for (let i = 0; i < this.formInputs.length; i++) {
      this.formInputs[i].addEventListener('input', () => {
        if (this.form && this.form.checkValidity()) {
          if (this.formBtn) {
            this.formBtn.removeAttribute('disabled');
          }
        } else {
          if (this.formBtn) {
            this.formBtn.setAttribute('disabled', '');
          }
        }
      });
    }

    // Enabling Page Navigation 

    this.navigationLinks = document.querySelectorAll('[data-nav-link]');
    this.pages = document.querySelectorAll('[data-page]');

    for (let i = 0; i < this.navigationLinks.length; i++) {
      this.navigationLinks[i].addEventListener('click', () => {
        for (let j = 0; j < this.pages.length; j++) {
          if (this.navigationLinks[i].innerHTML.toLowerCase() == (this.pages[j] as HTMLElement).dataset['page']) {
            this.pages[j].classList.add('active');
            this.navigationLinks[i].classList.add('active');
            window.scrollTo(0, 0);
          } else {
            this.pages[j].classList.remove('active');
            this.navigationLinks[j].classList.remove('active');
          }
        }
      });
    }
  }

  filterFunc(selectedValue: string) {
    for (let i = 0; i < this.filterItems.length; i++) {
      if (selectedValue == "all") {
        this.filterItems[i].classList.add('active');
      } else if (selectedValue == (this.filterItems[i] as HTMLElement).dataset['category']) {
        this.filterItems[i].classList.add('active');
      } else {
        this.filterItems[i].classList.remove('active');
      }
    }
  }
}
