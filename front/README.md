# dc-vue-preset

## Project setup
```
npm ci
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Нейминг веток
Название ветки формируется:

  - Feature (нововведение): `feature/JIRA-ID-TASK`
  - Fix (исправления): `fix/JIRA-ID-TASK`

## Code Review

  MR могут быть не идеальными, это нормально. После завершения задачи необходимо сделать МР своей ветки.
  После код ревью необходимо доработать свой код согласно замечаниям и запушить в ту же ветку.

## Общие требования к VUE файлам

Наименование файлов `PascalCase` стиле:

    components/
    |- MyComponent.vue

Наименование файлов в template `kebab-case` стиле:

    <!-- In DOM templates -->
    <my-component></my-component>

## Общие требования к Styles файлам

В проекте используется SASS(.scss) preprocessor

Пример:

```scss
.header-static {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $color--background;

  &__contact-info {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: $color--primary;

    &--hidden {
      display: none;
    }
  }
}
```

Используем BEM методологию:

`block-name__item-name--modificator`

Пример:

```html
<div class="header-static">
  <div class="header-static__location-info">
    <span>Some info</span>
  </div>
  <div class="header-static__contact-info">
    <span>Some info</span>
  </div>
  <div class="header-static__contact-info--hidden">
    <span>Some hidden info</span>
  </div>
</div>
```
