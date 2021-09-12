import { css } from './utils';

const template = (data) => `
    <div class="tooltip-title">${data.title}</div>
    <ul class="tooltip-list">
        <li class="tooltip-list-item">
                    <div class="value" style="color: ${data.items.color}">${data.items.value}</div>
                    <div class="name" style="color: ${data.items.color}">${data.items.name}</div>    
                </li>
    </ul> 
`;

export function tooltip (el) {
    const clear = () => (el.innerHTML = '');
    return {
        show ({ left, top }, data) {
            const { height, width } = el.getBoundingClientRect();
            clear();
            css(el, {
                display: 'block',
                top: top - height + 'px',
                left: left + width / 2 + 'px'
            });
            el.insertAdjacentHTML('afterbegin', template(data));
        },
        hide () {
            css(el, {display: 'none'});
        }
    };
}