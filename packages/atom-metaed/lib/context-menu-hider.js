/** @babel */
// @flow

import R from 'ramda';

function findAll(commands: string[]) {
  const found = [];
  const menus = atom.contextMenu.itemSets;

  /* eslint-disable */
  for (const menu in menus) {
    const items = menus[menu].items;
    for (let i = items.length; i--;) {
      const item = items[i];
      if (!item) {
        continue;
      }
      if (commands.indexOf(item.command) >= 0) {
        item.originMenu = menus[menu];
        item.currentParent = menus[menu];
        item.position = i;
        found.push(item);
      }
    }
  }
  /* eslint-enable */
  return found;
}

const sortByPosition = R.sortBy(R.prop('position'));

export default class CommandGroups {
  name: string;
  commands: string[];
  items: any;
  itemsByOriginMenu: any;

  constructor(name: string, commands: string[]) {
    this.name = name;
    this.commands = commands;
    this.items = findAll(this.commands);
    this.itemsByOriginMenu = R.groupWith(R.eqProps('originMenu'), this.items);
  }

  destructor() {
    this.reset();
    if (this.items) {
      /* eslint-disable */
      for (let i = this.items.length; i--;) {
        const item = this.items[i];
        delete item.originMenu;
        delete item.currentParent;
        delete item.position;
      }
      /* eslint-enable */
    }

    delete this.name;
    delete this.commands;
    delete this.items;
    delete this.itemsByOriginMenu;
  }

  hide() {
    if (!this.items) return;

    this.reset();

    this.itemsByOriginMenu.forEach(itemsForOriginMenu => {
      const itemsForOriginMenuSorted = R.reverse(sortByPosition(itemsForOriginMenu));
      itemsForOriginMenuSorted.forEach(item => {
        item.originMenu.items.splice(item.position, 1);
        // eslint-disable-next-line no-param-reassign
        item.currentParent = null;
      });
    });
  }

  show() {
    this.reset();
  }

  reset() {
    if (!this.items) return;

    this.itemsByOriginMenu.forEach(itemsForOriginMenu => {
      const itemsForOriginMenuSorted = sortByPosition(itemsForOriginMenu);
      itemsForOriginMenuSorted.forEach(item => {
        const origin = item.originMenu;
        if (item.currentParent !== origin) {
          // eslint-disable-next-line no-param-reassign
          item.currentParent = origin;
          origin.items.splice(item.position, 0, item);
        }
      });
    });
  }
}
