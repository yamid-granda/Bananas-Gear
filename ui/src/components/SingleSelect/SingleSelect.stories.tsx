import React, { useState } from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import type { SingleSelectOption } from './SingleSelect'
import SingleSelect from './SingleSelect'

export default {
  title: 'Single Select',
  component: SingleSelect,
} as ComponentMeta<typeof SingleSelect>

const options: SingleSelectOption[] = [
  { value: 'rust', text: 'Rust' },
  { value: 'go', text: 'Go' },
  { value: 'typescript', text: 'Typescript' },
  { value: 'haskell', text: 'Haskell' },
  { value: 'javascript', text: 'Javascript' },
]

export const Default: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState('')

  return (
    <SingleSelect
      value={value}
      options={options}
      onChange={setValue}
      name="Default"
    />
  )
}

export const InitialValue: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState('typescript')

  return (
    <SingleSelect
      value={value}
      options={options}
      onChange={setValue}
      name="InitialValue"
    />
  )
}

export const MuchOptions: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState('typescript')

  const muchOptions = [
    { value: 'rust', text: 'Rust' },
    { value: 'go', text: 'Go' },
    { value: 'typescript', text: 'Typescript' },
    { value: 'haskell', text: 'Haskell' },
    { value: 'javascript', text: 'Javascript' },
    { value: 'php', text: 'PHP' },
    { value: 'c#', text: 'C#' },
    { value: 'c', text: 'C' },
    { value: 'c++', text: 'C++' },
    { value: 'carbon', text: 'Carbon' },
    { value: 'scala', text: 'Scala' },
    { value: 'python', text: 'Python' },
    { value: 'ruby', text: 'Ruby' },
    { value: 'elixir', text: 'Elixir' },
    { value: 'groovy', text: 'Groovy' },
    { value: 'dart', text: 'Dart' },
    { value: 'zig', text: 'Zig' },
    { value: 'lua', text: 'Lua' },
    { value: 'java', text: 'Java' },
  ]

  return (
    <SingleSelect
      value={value}
      options={muchOptions}
      onChange={setValue}
      name="InitialValue"
    />
  )
}

export const ScrollBehavior: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur earum aliquid quisquam sequi consequatur soluta nihil numquam debitis eveniet facere ut hic placeat natus, recusandae reprehenderit, laboriosam repudiandae! Architecto blanditiis illum quo ullam eos accusantium ipsam corrupti, cum maiores deleniti, voluptas dolorum nisi officia sint eius consequuntur est. Minus ab, id laboriosam architecto vitae voluptatem voluptates animi magni inventore qui vel ea iure consequatur corrupti eum nam quisquam ratione quis tenetur velit earum? Cupiditate accusantium ullam corporis, quis repellat soluta odio dicta quam error quos tempora ut repellendus velit consequuntur vel. Quas enim minus optio! Enim, deleniti. Fugit nihil fuga hic ullam. Voluptas consequuntur temporibus dicta distinctio soluta voluptatem ipsa esse minima illo at veniam, eaque odit repellat ut amet ex minus voluptate cum consectetur officia, tempore eius! Accusamus molestias quibusdam dignissimos temporibus cumque nostrum at quia expedita. Et voluptas itaque, ad neque asperiores sint facilis rem quaerat expedita tempore ipsa doloremque odio, quia quis dolores beatae reprehenderit mollitia illo odit natus corporis! Quis harum quod ad quam fugit tempore modi fuga, inventore accusantium eligendi quas animi vero? Temporibus facilis odio numquam dicta itaque fuga rerum repellendus nesciunt a minima. Eveniet voluptatem distinctio itaque eos, reprehenderit consectetur culpa voluptates expedita ipsum tempore sequi dignissimos quas laudantium tenetur deserunt placeat nulla et molestiae fugit cumque magnam blanditiis. Expedita harum fugiat provident delectus atque aspernatur asperiores minus minima totam molestias, ullam accusantium officiis? Reprehenderit, porro quod deleniti, velit unde quisquam aperiam quam ratione quas id vel dolor iusto ut quasi fugiat minima voluptate itaque non facere vitae minus dolorem atque doloribus temporibus. Nostrum numquam neque nulla deleniti atque. Itaque veritatis, numquam iure beatae dicta aperiam corrupti illum recusandae minima molestiae doloremque perferendis eveniet suscipit praesentium at incidunt cum quae. Quo sed recusandae error assumenda quam veritatis molestias sit explicabo. Repellat facere eum dicta in autem reiciendis a nihil, reprehenderit voluptatibus aliquid, officia nemo accusamus hic quasi sunt rerum iure natus ratione, adipisci eius ullam corrupti inventore officiis. Ipsam doloremque, quae debitis, ab sunt facere delectus consequatur quibusdam sapiente possimus qui? Natus alias molestiae explicabo aperiam sed quo optio maiores iure animi repudiandae quas, facere accusamus mollitia magnam dolorem error quos, cupiditate corporis, at aspernatur saepe iste itaque? In ipsum hic libero, molestiae, perferendis quia ab debitis harum ex fugit iure atque aut et? Non cum eligendi deleniti commodi provident laboriosam hic ipsam at dolor temporibus. Reiciendis, omnis placeat? Impedit autem ex, minima quia dolorem sunt ipsa doloribus amet atque eius consequuntur rem ipsam odio qui? Sint laborum molestias quam recusandae non veniam expedita eos totam omnis, culpa neque sunt provident. Vel ullam totam veritatis quidem, error ducimus modi possimus cum esse voluptatem, sint recusandae officia nostrum omnis incidunt culpa est rerum molestiae quisquam doloremque ipsa. Cum veniam atque facilis, libero optio est cupiditate quibusdam, amet modi repellat quidem necessitatibus perferendis sed dolorum non quas ea aut nulla explicabo tenetur saepe vel. Nihil error molestias ducimus earum culpa nulla, beatae qui deserunt incidunt dolores maxime explicabo architecto et neque cum veniam est odit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur earum aliquid quisquam sequi consequatur soluta nihil numquam debitis eveniet facere ut hic placeat natus, recusandae reprehenderit, laboriosam repudiandae! Architecto blanditiis illum quo ullam eos accusantium ipsam corrupti, cum maiores deleniti, voluptas dolorum nisi officia sint eius consequuntur est. Minus ab, id laboriosam architecto vitae voluptatem voluptates animi magni inventore qui vel ea iure consequatur corrupti eum nam quisquam ratione quis tenetur velit earum? Cupiditate accusantium ullam corporis, quis repellat soluta odio dicta quam error quos tempora ut repellendus velit consequuntur vel. Quas enim minus optio! Enim, deleniti. Fugit nihil fuga hic ullam. Voluptas consequuntur temporibus dicta distinctio soluta voluptatem ipsa esse minima illo at veniam, eaque odit repellat ut amet ex minus voluptate cum consectetur officia, tempore eius! Accusamus molestias quibusdam dignissimos temporibus cumque nostrum at quia expedita. Et voluptas itaque, ad neque asperiores sint facilis rem quaerat expedita tempore ipsa doloremque odio, quia quis dolores beatae reprehenderit mollitia illo odit natus corporis! Quis harum quod ad quam fugit tempore modi fuga, inventore accusantium eligendi quas animi vero? Temporibus facilis odio numquam dicta itaque fuga rerum repellendus nesciunt a minima. Eveniet voluptatem distinctio itaque eos, reprehenderit consectetur culpa voluptates expedita ipsum tempore sequi dignissimos quas laudantium tenetur deserunt placeat nulla et molestiae fugit cumque magnam blanditiis. Expedita harum fugiat provident delectus atque aspernatur asperiores minus minima totam molestias, ullam accusantium officiis? Reprehenderit, porro quod deleniti, velit unde quisquam aperiam quam ratione quas id vel dolor iusto ut quasi fugiat minima voluptate itaque non facere vitae minus dolorem atque doloribus temporibus. Nostrum numquam neque nulla deleniti atque. Itaque veritatis, numquam iure beatae dicta aperiam corrupti illum recusandae minima molestiae doloremque perferendis eveniet suscipit praesentium at incidunt cum quae. Quo sed recusandae error assumenda quam veritatis molestias sit explicabo. Repellat facere eum dicta in autem reiciendis a nihil, reprehenderit voluptatibus aliquid, officia nemo accusamus hic quasi sunt rerum iure natus ratione, adipisci eius ullam corrupti inventore officiis. Ipsam doloremque, quae debitis, ab sunt facere delectus consequatur quibusdam sapiente possimus qui? Natus alias molestiae explicabo aperiam sed quo optio maiores iure animi repudiandae quas, facere accusamus mollitia magnam dolorem error quos, cupiditate corporis, at aspernatur saepe iste itaque? In ipsum hic libero, molestiae, perferendis quia ab debitis harum ex fugit iure atque aut et? Non cum eligendi deleniti commodi provident laboriosam hic ipsam at dolor temporibus. Reiciendis, omnis placeat? Impedit autem ex, minima quia dolorem sunt ipsa doloribus amet atque eius consequuntur rem ipsam odio qui? Sint laborum molestias quam recusandae non veniam expedita eos totam omnis, culpa neque sunt provident. Vel ullam totam veritatis quidem, error ducimus modi possimus cum esse voluptatem, sint recusandae officia nostrum omnis incidunt culpa est rerum molestiae quisquam doloremque ipsa. Cum veniam atque facilis, libero optio est cupiditate quibusdam, amet modi repellat quidem necessitatibus perferendis sed dolorum non quas ea aut nulla explicabo tenetur saepe vel. Nihil error molestias ducimus earum culpa nulla, beatae qui deserunt incidunt dolores maxime explicabo architecto et neque cum veniam est odit.

      {value}
      <SingleSelect
        value={value}
        options={options}
        onChange={setValue}
        name="ScrollBehavior"
      />
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, dicta possimus laborum tempora aliquam dolorum, ex excepturi quisquam nostrum quidem iste aut iusto facilis est odio architecto, velit harum nemo amet explicabo! Repellendus quisquam, deserunt minus adipisci nihil dolores, dignissimos et eveniet sed vel, ut in blanditiis eum saepe! Sed quam officiis sint dolorum autem laborum fugit neque hic! Adipisci debitis exercitationem dignissimos nobis nesciunt consequatur maxime aut ullam? Quidem veritatis architecto deleniti officiis dolores facere. Magnam porro atque corporis enim velit officia ratione sequi, esse expedita, fugit dolores! Error eaque debitis harum ipsum dignissimos dolorem tempora quis culpa. Incidunt, quos, labore explicabo libero tempore cum amet saepe accusantium repellat pariatur illo! Provident repellat distinctio, qui omnis reprehenderit fugiat tempora facilis quidem sint, quas numquam officiis veritatis at, libero voluptatem obcaecati placeat culpa? Natus magnam, ipsa ipsum minus vero praesentium ratione beatae deleniti, mollitia ea dolor delectus enim suscipit fuga accusantium molestias consequuntur animi expedita? Et deleniti ad fugit esse nisi aliquam incidunt at est praesentium? Optio adipisci nesciunt iure, recusandae voluptates itaque nulla nisi a cum dignissimos? Rerum officia, nisi culpa, beatae distinctio asperiores mollitia dolorem consectetur explicabo sapiente iste laboriosam. Facilis, rerum! Ea soluta aut non possimus nostrum. Fugit, asperiores, inventore temporibus dolorem voluptatibus debitis, consectetur laborum provident corrupti accusantium perspiciatis harum. Aut quam quibusdam porro similique corrupti pariatur praesentium cumque odit recusandae dolore impedit, obcaecati nobis et voluptatibus autem aliquid cum debitis non ipsam aperiam aliquam repellat odio! Ea laudantium natus fugit temporibus itaque sapiente, cupiditate maxime maiores saepe, laboriosam, placeat quam quidem sint corrupti ipsa? Vitae fugiat, officia labore ratione iure blanditiis. Asperiores magnam quis, amet est repellat possimus quidem veniam tenetur a, esse molestiae sit reprehenderit debitis fugit sequi vitae hic accusamus temporibus eius nam et dolorum voluptates in! Officiis porro dolor deleniti sed ipsam voluptas sunt reprehenderit id illum non quisquam cum consectetur repudiandae, quod, ipsa facere vero excepturi delectus nisi ut voluptate architecto quibusdam, nihil optio. Velit non quod consequuntur consequatur sapiente ullam ex et obcaecati inventore voluptas id, debitis nemo natus nam fugit, iure pariatur voluptatibus. Quia ipsa explicabo tempora reprehenderit quis provident illum! Distinctio nemo numquam consequuntur voluptates culpa doloribus voluptatibus autem atque magnam obcaecati rerum temporibus quam, tempore facere reiciendis quis dignissimos odio porro harum quaerat id accusantium, voluptatum aut accusamus? Inventore quos quibusdam id. Impedit laudantium totam, minima tenetur obcaecati saepe, delectus placeat quas eligendi debitis aspernatur? Laboriosam, perferendis. Cum, quod. Est, ipsum animi iusto, consequatur veritatis minima soluta ratione debitis blanditiis corrupti excepturi voluptas repellendus eligendi, voluptate aliquam veniam. Nam praesentium nihil debitis quo natus itaque quos sunt ullam non quas, asperiores, libero, iure obcaecati sint. Inventore, ducimus. Cupiditate praesentium ullam perspiciatis culpa, dolore ut laborum. Facilis porro quasi quibusdam. Possimus, laudantium quasi quam tempora nisi exercitationem fugiat tenetur enim laborum praesentium fugit laboriosam unde voluptatum ut deleniti assumenda esse neque quod magnam numquam ex? Sapiente asperiores ipsam ratione, minus deserunt omnis quam quisquam autem quo aspernatur dolor quos recusandae odit maxime! Ipsam aperiam voluptatum quam voluptate tempore?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, dicta possimus laborum tempora aliquam dolorum, ex excepturi quisquam nostrum quidem iste aut iusto facilis est odio architecto, velit harum nemo amet explicabo! Repellendus quisquam, deserunt minus adipisci nihil dolores, dignissimos et eveniet sed vel, ut in blanditiis eum saepe! Sed quam officiis sint dolorum autem laborum fugit neque hic! Adipisci debitis exercitationem dignissimos nobis nesciunt consequatur maxime aut ullam? Quidem veritatis architecto deleniti officiis dolores facere. Magnam porro atque corporis enim velit officia ratione sequi, esse expedita, fugit dolores! Error eaque debitis harum ipsum dignissimos dolorem tempora quis culpa. Incidunt, quos, labore explicabo libero tempore cum amet saepe accusantium repellat pariatur illo! Provident repellat distinctio, qui omnis reprehenderit fugiat tempora facilis quidem sint, quas numquam officiis veritatis at, libero voluptatem obcaecati placeat culpa? Natus magnam, ipsa ipsum minus vero praesentium ratione beatae deleniti, mollitia ea dolor delectus enim suscipit fuga accusantium molestias consequuntur animi expedita? Et deleniti ad fugit esse nisi aliquam incidunt at est praesentium? Optio adipisci nesciunt iure, recusandae voluptates itaque nulla nisi a cum dignissimos? Rerum officia, nisi culpa, beatae distinctio asperiores mollitia dolorem consectetur explicabo sapiente iste laboriosam. Facilis, rerum! Ea soluta aut non possimus nostrum. Fugit, asperiores, inventore temporibus dolorem voluptatibus debitis, consectetur laborum provident corrupti accusantium perspiciatis harum. Aut quam quibusdam porro similique corrupti pariatur praesentium cumque odit recusandae dolore impedit, obcaecati nobis et voluptatibus autem aliquid cum debitis non ipsam aperiam aliquam repellat odio! Ea laudantium natus fugit temporibus itaque sapiente, cupiditate maxime maiores saepe, laboriosam, placeat quam quidem sint corrupti ipsa? Vitae fugiat, officia labore ratione iure blanditiis. Asperiores magnam quis, amet est repellat possimus quidem veniam tenetur a, esse molestiae sit reprehenderit debitis fugit sequi vitae hic accusamus temporibus eius nam et dolorum voluptates in! Officiis porro dolor deleniti sed ipsam voluptas sunt reprehenderit id illum non quisquam cum consectetur repudiandae, quod, ipsa facere vero excepturi delectus nisi ut voluptate architecto quibusdam, nihil optio. Velit non quod consequuntur consequatur sapiente ullam ex et obcaecati inventore voluptas id, debitis nemo natus nam fugit, iure pariatur voluptatibus. Quia ipsa explicabo tempora reprehenderit quis provident illum! Distinctio nemo numquam consequuntur voluptates culpa doloribus voluptatibus autem atque magnam obcaecati rerum temporibus quam, tempore facere reiciendis quis dignissimos odio porro harum quaerat id accusantium, voluptatum aut accusamus? Inventore quos quibusdam id. Impedit laudantium totam, minima tenetur obcaecati saepe, delectus placeat quas eligendi debitis aspernatur? Laboriosam, perferendis. Cum, quod. Est, ipsum animi iusto, consequatur veritatis minima soluta ratione debitis blanditiis corrupti excepturi voluptas repellendus eligendi, voluptate aliquam veniam. Nam praesentium nihil debitis quo natus itaque quos sunt ullam non quas, asperiores, libero, iure obcaecati sint. Inventore, ducimus. Cupiditate praesentium ullam perspiciatis culpa, dolore ut laborum. Facilis porro quasi quibusdam. Possimus, laudantium quasi quam tempora nisi exercitationem fugiat tenetur enim laborum praesentium fugit laboriosam unde voluptatum ut deleniti assumenda esse neque quod magnam numquam ex? Sapiente asperiores ipsam ratione, minus deserunt omnis quam quisquam autem quo aspernatur dolor quos recusandae odit maxime! Ipsam aperiam voluptatum quam voluptate tempore?
    </div>
  )
}
