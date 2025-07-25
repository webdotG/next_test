--START

grant@home:~/projects/next_test/src$ tree -L 4
.
├── app
│   ├── layout.tsx
│   ├── mainTable
│   │   ├── confirm
│   │   │   └── page.tsx
│   │   ├── Filters
│   │   │   ├── ColorFilter.tsx
│   │   │   ├── CommentFilter.tsx
│   │   │   ├── DeliveryFilter.tsx
│   │   │   ├── DietaryFilter.tsx
│   │   │   ├── FragilityFilter.tsx
│   │   │   ├── HeightFilter.tsx
│   │   │   ├── IdFilter.tsx
│   │   │   ├── MaterialFilter.tsx
│   │   │   ├── NameFilter.tsx
│   │   │   ├── PackagingFilter.tsx
│   │   │   ├── RaitingFilter.tsx
│   │   │   ├── ShapeFilter.tsx
│   │   │   ├── WeightFilter.tsx
│   │   │   └── WidthFilter.tsx
│   │   ├── FiltersActions.tsx
│   │   ├── layout.tsx
│   │   ├── MainTableComponent.tsx
│   │   ├── page.tsx
│   │   └── Preview.tsx
│   └── page.module.css
├── components
│   └── ConfirmModal.tsx
└── store
└── tableStore.ts

7 directories, 24 files

--FULL
src/
├── app/
│   ├── layout.tsx # общий layout
│   ├── page.tsx # главная страница — MainTableList
│   ├── mainTableItem/ # модуль заказов (создание, редактирование)
│   │   ├── layout.tsx # layout формы заказов
│   │   ├── new/
│   │   │   └── page.tsx # страница создания заказа
│   │   ├── [id]/
│   │   │   └── page.tsx # страница редактирования/просмотра заказа
│   │   └── components/
│   │   ├── MainTableForm.tsx # сама форма заказа (твоя бывшая MainTableComponent)
│   │   ├── ConfirmModal.tsx # модалка подтверждения отправки
│   │   ├── Filters/
│   │   │   ├── ColorFilter.tsx
│   │   │   ├── CommentFilter.tsx
│   │   │   ├── DeliveryFilter.tsx
│   │   │   ├── DietaryFilter.tsx
│   │   │   ├── FragilityFilter.tsx
│   │   │   ├── HeightFilter.tsx
│   │   │   ├── IdFilter.tsx
│   │   │   ├── MaterialFilter.tsx
│   │   │   ├── NameFilter.tsx
│   │   │   ├── PackagingFilter.tsx
│   │   │   ├── RaitingFilter.tsx
│   │   │   ├── ShapeFilter.tsx
│   │   │   ├── WeightFilter.tsx
│   │   │   └── WidthFilter.tsx
│   │   ├── FiltersActions.tsx # сбросить / отправить
│   │   └── Preview.tsx # превью активных фильтров
├── components/
│   └── MainTableList.tsx # таблица со списком заказов
├── store/
│   ├── filtersStore.ts # состояние формы заказа (массив фильтров)
│   ├── ordersStore.ts # список заказов, сортировка, фильтрация
│   ├── authStore.ts # информация о пользователе / роли
│   └── modalStore.ts # глобальное управление модалками (если понадобится)
├── lib/
│   ├── types.ts # все типы (Order, FilterValue и т.д.)
│   ├── constants.ts # enum'ы и фиксированные значения
│   └── utils.ts # утилиты для URL, преобразования и т.д.
├── styles/
│   └── globals.css # глобальные стили
└── app/page.module.css # если нужно
