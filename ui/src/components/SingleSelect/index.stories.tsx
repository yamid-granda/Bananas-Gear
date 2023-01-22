import { useState } from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import type { SingleSelectOption, SingleSelectValue } from '.'
import SingleSelect from '.'
import Button from '@/ui/components/Button'
import Modal from '@/ui/components/Modal'

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
  const [value, setValue] = useState<SingleSelectValue>(null)

  const options: SingleSelectOption[] = [
    { value: 'rust', text: 'Rust' },
    { value: 'go', text: 'Go' },
    { value: 'typescript', text: 'Typescript' },
    { value: 'haskell', text: 'Haskell' },
    { value: 'javascript', text: 'Javascript' },
  ]

  function onChange(value: string) {
    setValue(value)
  }

  return (
    <SingleSelect
      value={value}
      label="Single select label"
      options={options}
      onChange={onChange}
      name="default"
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
      name="initial-value"
    />
  )
}

export const Message: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState<SingleSelectValue>(null)

  return (
    <SingleSelect
      value={value}
      name="message"
      message="Input custom message"
      options={options}
      onChange={setValue}
    />
  )
}

export const ErrorState: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState<SingleSelectValue>(null)

  return (
    <SingleSelect
      value={value}
      label="Select label"
      options={options}
      name="error-state"
      state="error"
      onChange={setValue}
    />
  )
}

export const ErrorStateMessage: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState<SingleSelectValue>(null)

  return (
    <SingleSelect
      value={value}
      label="Select label"
      message="Input custom message"
      options={options}
      name="error-state-message"
      state="error"
      onChange={setValue}
    />
  )
}

export const MuchOptions: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState<SingleSelectValue>(null)

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
      name="initial-value"
    />
  )
}

export const ScrollBehavior: ComponentStory<typeof SingleSelect> = () => {
  const [value, setValue] = useState<SingleSelectValue>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur earum aliquid quisquam sequi consequatur soluta nihil numquam debitis eveniet facere ut hic placeat natus, recusandae reprehenderit, laboriosam repudiandae! Architecto blanditiis illum quo ullam eos accusantium ipsam corrupti, cum maiores deleniti, voluptas dolorum nisi officia sint eius consequuntur est. Minus ab, id laboriosam architecto vitae voluptatem voluptates animi magni inventore qui vel ea iure consequatur corrupti eum nam quisquam ratione quis tenetur velit earum? Cupiditate accusantium ullam corporis, quis repellat soluta odio dicta quam error quos tempora ut repellendus velit consequuntur vel. Quas enim minus optio! Enim, deleniti. Fugit nihil fuga hic ullam. Voluptas consequuntur temporibus dicta distinctio soluta voluptatem ipsa esse minima illo at veniam, eaque odit repellat ut amet ex minus voluptate cum consectetur officia, tempore eius! Accusamus molestias quibusdam dignissimos temporibus cumque nostrum at quia expedita. Et voluptas itaque, ad neque asperiores sint facilis rem quaerat expedita tempore ipsa doloremque odio, quia quis dolores beatae reprehenderit mollitia illo odit natus corporis! Quis harum quod ad quam fugit tempore modi fuga, inventore accusantium eligendi quas animi vero? Temporibus facilis odio numquam dicta itaque fuga rerum repellendus nesciunt a minima. Eveniet voluptatem distinctio itaque eos, reprehenderit consectetur culpa voluptates expedita ipsum tempore sequi dignissimos quas laudantium tenetur deserunt placeat nulla et molestiae fugit cumque magnam blanditiis. Expedita harum fugiat provident delectus atque aspernatur asperiores minus minima totam molestias, ullam accusantium officiis? Reprehenderit, porro quod deleniti, velit unde quisquam aperiam quam ratione quas id vel dolor iusto ut quasi fugiat minima voluptate itaque non facere vitae minus dolorem atque doloribus temporibus. Nostrum numquam neque nulla deleniti atque. Itaque veritatis, numquam iure beatae dicta aperiam corrupti illum recusandae minima molestiae doloremque perferendis eveniet suscipit praesentium at incidunt cum quae. Quo sed recusandae error assumenda quam veritatis molestias sit explicabo. Repellat facere eum dicta in autem reiciendis a nihil, reprehenderit voluptatibus aliquid, officia nemo accusamus hic quasi sunt rerum iure natus ratione, adipisci eius ullam corrupti inventore officiis. Ipsam doloremque, quae debitis, ab sunt facere delectus consequatur quibusdam sapiente possimus qui? Natus alias molestiae explicabo aperiam sed quo optio maiores iure animi repudiandae quas, facere accusamus mollitia magnam dolorem error quos, cupiditate corporis, at aspernatur saepe iste itaque? In ipsum hic libero, molestiae, perferendis quia ab debitis harum ex fugit iure atque aut et? Non cum eligendi deleniti commodi provident laboriosam hic ipsam at dolor temporibus. Reiciendis, omnis placeat? Impedit autem ex, minima quia dolorem sunt ipsa doloribus amet atque eius consequuntur rem ipsam odio qui? Sint laborum molestias quam recusandae non veniam expedita eos totam omnis, culpa neque sunt provident. Vel ullam totam veritatis quidem, error ducimus modi possimus cum esse voluptatem, sint recusandae officia nostrum omnis incidunt culpa est rerum molestiae quisquam doloremque ipsa. Cum veniam atque facilis, libero optio est cupiditate quibusdam, amet modi repellat quidem necessitatibus perferendis sed dolorum non quas ea aut nulla explicabo tenetur saepe vel. Nihil error molestias ducimus earum culpa nulla, beatae qui deserunt incidunt dolores maxime explicabo architecto et neque cum veniam est odit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur earum aliquid quisquam sequi consequatur soluta nihil numquam debitis eveniet facere ut hic placeat natus, recusandae reprehenderit, laboriosam repudiandae! Architecto blanditiis illum quo ullam eos accusantium ipsam corrupti, cum maiores deleniti, voluptas dolorum nisi officia sint eius consequuntur est. Minus ab, id laboriosam architecto vitae voluptatem voluptates animi magni inventore qui vel ea iure consequatur corrupti eum nam quisquam ratione quis tenetur velit earum? Cupiditate accusantium ullam corporis, quis repellat soluta odio dicta quam error quos tempora ut repellendus velit consequuntur vel. Quas enim minus optio! Enim, deleniti. Fugit nihil fuga hic ullam. Voluptas consequuntur temporibus dicta distinctio soluta voluptatem ipsa esse minima illo at veniam, eaque odit repellat ut amet ex minus voluptate cum consectetur officia, tempore eius! Accusamus molestias quibusdam dignissimos temporibus cumque nostrum at quia expedita. Et voluptas itaque, ad neque asperiores sint facilis rem quaerat expedita tempore ipsa doloremque odio, quia quis dolores beatae reprehenderit mollitia illo odit natus corporis! Quis harum quod ad quam fugit tempore modi fuga, inventore accusantium eligendi quas animi vero? Temporibus facilis odio numquam dicta itaque fuga rerum repellendus nesciunt a minima. Eveniet voluptatem distinctio itaque eos, reprehenderit consectetur culpa voluptates expedita ipsum tempore sequi dignissimos quas laudantium tenetur deserunt placeat nulla et molestiae fugit cumque magnam blanditiis. Expedita harum fugiat provident delectus atque aspernatur asperiores minus minima totam molestias, ullam accusantium officiis? Reprehenderit, porro quod deleniti, velit unde quisquam aperiam quam ratione quas id vel dolor iusto ut quasi fugiat minima voluptate itaque non facere vitae minus dolorem atque doloribus temporibus. Nostrum numquam neque nulla deleniti atque. Itaque veritatis, numquam iure beatae dicta aperiam corrupti illum recusandae minima molestiae doloremque perferendis eveniet suscipit praesentium at incidunt cum quae. Quo sed recusandae error assumenda quam veritatis molestias sit explicabo. Repellat facere eum dicta in autem reiciendis a nihil, reprehenderit voluptatibus aliquid, officia nemo accusamus hic quasi sunt rerum iure natus ratione, adipisci eius ullam corrupti inventore officiis. Ipsam doloremque, quae debitis, ab sunt facere delectus consequatur quibusdam sapiente possimus qui? Natus alias molestiae explicabo aperiam sed quo optio maiores iure animi repudiandae quas, facere accusamus mollitia magnam dolorem error quos, cupiditate corporis, at aspernatur saepe iste itaque? In ipsum hic libero, molestiae, perferendis quia ab debitis harum ex fugit iure atque aut et? Non cum eligendi deleniti commodi provident laboriosam hic ipsam at dolor temporibus. Reiciendis, omnis placeat? Impedit autem ex, minima quia dolorem sunt ipsa doloribus amet atque eius consequuntur rem ipsam odio qui? Sint laborum molestias quam recusandae non veniam expedita eos totam omnis, culpa neque sunt provident. Vel ullam totam veritatis quidem, error ducimus modi possimus cum esse voluptatem, sint recusandae officia nostrum omnis incidunt culpa est rerum molestiae quisquam doloremque ipsa. Cum veniam atque facilis, libero optio est cupiditate quibusdam, amet modi repellat quidem necessitatibus perferendis sed dolorum non quas ea aut nulla explicabo tenetur saepe vel. Nihil error molestias ducimus earum culpa nulla, beatae qui deserunt incidunt dolores maxime explicabo architecto et neque cum veniam est odit.

      <SingleSelect
        value={value}
        options={options}
        onChange={setValue}
        name="scroll-behavior"
      />

      <Button onClick={() => { setIsModalOpen(true) }}>Show Inside Modal</Button>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium aliquid porro reprehenderit sunt quasi dicta? Voluptatum quaerat vero libero vel repellat, at placeat voluptatibus cumque nemo suscipit rem voluptatem totam, nisi soluta ipsum a pariatur earum consequatur optio adipisci ullam dolor minus neque. Dignissimos, optio minima ratione fugit quis amet, possimus ut voluptatibus iusto voluptas praesentium ad in nemo aspernatur officia itaque numquam autem vel illo quae? Reiciendis similique minus aspernatur adipisci ea sequi magni beatae debitis incidunt, nostrum quibusdam iusto id tenetur omnis nulla consequatur harum necessitatibus libero alias laboriosam eveniet repudiandae voluptas et eius? Recusandae placeat voluptatem assumenda. Quidem et cupiditate quasi, repellendus ea numquam adipisci inventore. Illum beatae aliquam, corporis sit aut quo provident sapiente ab reprehenderit! Doloribus dolorum molestiae veniam nisi! Magni corporis, adipisci totam est, officia nemo mollitia fugit consequatur quibusdam porro inventore nam iste, quisquam dolorem aperiam nulla! Earum nisi eum rerum suscipit, repellendus facilis fugiat porro ratione esse beatae voluptate accusamus vel voluptas quos, reiciendis soluta totam! Praesentium obcaecati totam eaque odit distinctio excepturi voluptate, quibusdam dignissimos. Hic eum veritatis quisquam minima, obcaecati illo molestiae. Reiciendis rerum eligendi fugiat maxime amet voluptatem a perferendis aspernatur vitae! Quas perferendis explicabo, repudiandae doloremque repellat quos enim numquam voluptatum odit quam autem deleniti impedit nam ratione id, officiis ipsa, in dolor voluptatem. Culpa tenetur fuga labore cumque! Ipsam ipsum necessitatibus, perspiciatis architecto harum libero distinctio possimus corrupti culpa id obcaecati aut deserunt tenetur quam consequatur blanditiis minus praesentium cupiditate aliquam accusamus impedit doloribus. Esse architecto, numquam et neque eum iure possimus quisquam corporis facere? Voluptatem rerum totam recusandae provident, modi obcaecati nesciunt asperiores voluptates quasi, dignissimos delectus laborum quod pariatur fugiat nulla illo eius vel. Molestias ab consequuntur, reprehenderit possimus consectetur odio ipsam exercitationem laboriosam nihil tempora officia quaerat sint quasi amet voluptatum est eaque voluptates laborum impedit inventore quibusdam dolorem enim blanditiis natus! Sint recusandae molestiae officia nesciunt cumque. Eos facere unde facilis voluptates tenetur! Laboriosam aut delectus, voluptas nesciunt tempora impedit inventore natus nulla adipisci voluptatum, magnam rerum ut. Iste mollitia dolorem autem consequuntur commodi ex cupiditate architecto eum, nesciunt quasi esse! Accusantium autem blanditiis architecto pariatur. Tempora voluptatum dicta rerum ut repudiandae, excepturi porro deserunt sequi, laborum quod totam eum consectetur dignissimos maxime reprehenderit ad esse modi corrupti dolores id adipisci explicabo. Facere quisquam ducimus illum, ad, beatae possimus libero praesentium, cupiditate vel debitis odio? Corrupti, distinctio ducimus ad tempora nemo fugiat eligendi quos id quisquam quam! Perspiciatis, ad eius. Enim reiciendis impedit accusantium, eos eius voluptates omnis. Est perferendis non sit maiores, ut quod similique architecto cum facilis impedit recusandae neque voluptas inventore aliquam quia. Ipsum nemo earum ea consequatur iste maiores deserunt hic, eligendi cumque. Accusantium, iste, optio eaque est mollitia accusamus velit voluptates error doloribus ea unde possimus! Distinctio ab dolore maiores dolores, consequatur, aliquid debitis nam, quam quod repellendus nihil quas numquam. Doloremque voluptas voluptatum porro pariatur sapiente aspernatur nulla dicta, suscipit, blanditiis exercitationem dolor! Quis iure laborum corporis temporibus dolorem excepturi laboriosam cum? Adipisci facere sunt vel voluptatem.

        <SingleSelect
          value={value}
          options={options}
          onChange={setValue}
          name="scroll-behavior-inside-modal"
        />

        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat omnis neque asperiores aliquid consectetur, eaque, doloribus enim harum deleniti recusandae doloremque ea blanditiis amet distinctio voluptates excepturi ipsum ab, non saepe! Debitis laboriosam unde suscipit repellendus incidunt dicta, distinctio omnis quas inventore dolores corporis rerum at quaerat eveniet velit recusandae quo mollitia nulla sit aut quod. Error tenetur repellat dolores doloribus laboriosam magnam est architecto maxime suscipit cum veritatis id excepturi rerum soluta, reiciendis aut quos eligendi aliquid incidunt sed sequi natus asperiores quam! Ullam laboriosam adipisci natus qui aperiam magnam officia porro cupiditate. Fugit laboriosam, distinctio velit officiis veritatis culpa quo deleniti. Veniam maxime commodi blanditiis eveniet non nulla, quidem ea? Debitis maiores voluptatibus eos veritatis voluptas, deleniti ab reprehenderit neque illum porro sapiente repellendus error dolorum earum dolor voluptate exercitationem, magnam perspiciatis praesentium nesciunt cum, ullam accusantium. Provident, placeat voluptas quae, at, dolores fugit dicta ea id explicabo debitis ipsum corporis numquam. Et, minima ratione. Exercitationem debitis nisi, numquam provident enim ullam, laudantium vel pariatur beatae commodi accusantium nihil aliquam ipsam minus sapiente! Laudantium voluptas illo neque cum accusantium asperiores animi id perferendis beatae, numquam explicabo laboriosam natus velit expedita iusto, aspernatur, fuga nostrum. Commodi libero quod magni dolorum dolore optio tempore. Labore pariatur esse fuga fugiat error porro inventore voluptate ipsam eius blanditiis nesciunt quas tempora earum est, sint non libero quaerat adipisci, rem aspernatur nobis magni, in incidunt facilis. Nemo numquam nam assumenda asperiores qui! Aperiam quasi quis itaque. Unde ea sint cumque libero culpa quam officia asperiores itaque ullam harum illo, modi excepturi voluptatibus vero ipsa aliquid architecto cupiditate quod nihil, ratione, corporis tempora veritatis inventore ipsum. Unde minus fugiat molestias dolore veritatis mollitia autem perferendis repellat quas veniam sequi numquam quibusdam, rerum, qui cumque facilis eum quasi, deserunt est? Nesciunt beatae deleniti impedit? Voluptatibus consequuntur adipisci necessitatibus, sapiente voluptatum sequi? Dignissimos quos aliquam odio sit cupiditate eum? Cum fuga quam debitis a eveniet pariatur velit repellendus ducimus praesentium non corporis amet vitae hic iusto enim dicta voluptatem officiis reiciendis animi optio exercitationem, expedita alias? Maxime, magni veritatis? Illo dolores tempora quisquam debitis, non expedita inventore reprehenderit excepturi optio voluptatibus autem a, consequuntur rerum explicabo repellat! Fugit minima labore accusamus, dolore dicta mollitia sed cum voluptate voluptatum soluta sit illo quis. Similique quo ea dicta temporibus reprehenderit. Amet quibusdam similique, quisquam iste veniam illo, possimus omnis dolor harum quod eum animi laboriosam quaerat voluptates corporis ipsam nostrum, culpa aut consequuntur dicta ducimus! Dolores excepturi atque, perferendis neque placeat, libero dolore blanditiis mollitia corrupti quae saepe quibusdam. Maiores minus consectetur esse quidem incidunt, excepturi nulla totam consequatur nesciunt delectus eum enim. Quas nisi sequi dolorum in cupiditate, provident sint, expedita quod libero et esse sit ipsam, sed culpa eveniet debitis quia ipsum modi hic doloremque. Recusandae, quaerat placeat eum, labore rem repellendus dolorem impedit aperiam ducimus, dolor cum. Adipisci inventore autem velit est nam ex veritatis expedita sapiente fugiat nihil voluptatem voluptate, laborum quae excepturi a nulla, culpa corrupti saepe nostrum mollitia, quam quaerat eaque veniam.
      </Modal>

      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, dicta possimus laborum tempora aliquam dolorum, ex excepturi quisquam nostrum quidem iste aut iusto facilis est odio architecto, velit harum nemo amet explicabo! Repellendus quisquam, deserunt minus adipisci nihil dolores, dignissimos et eveniet sed vel, ut in blanditiis eum saepe! Sed quam officiis sint dolorum autem laborum fugit neque hic! Adipisci debitis exercitationem dignissimos nobis nesciunt consequatur maxime aut ullam? Quidem veritatis architecto deleniti officiis dolores facere. Magnam porro atque corporis enim velit officia ratione sequi, esse expedita, fugit dolores! Error eaque debitis harum ipsum dignissimos dolorem tempora quis culpa. Incidunt, quos, labore explicabo libero tempore cum amet saepe accusantium repellat pariatur illo! Provident repellat distinctio, qui omnis reprehenderit fugiat tempora facilis quidem sint, quas numquam officiis veritatis at, libero voluptatem obcaecati placeat culpa? Natus magnam, ipsa ipsum minus vero praesentium ratione beatae deleniti, mollitia ea dolor delectus enim suscipit fuga accusantium molestias consequuntur animi expedita? Et deleniti ad fugit esse nisi aliquam incidunt at est praesentium? Optio adipisci nesciunt iure, recusandae voluptates itaque nulla nisi a cum dignissimos? Rerum officia, nisi culpa, beatae distinctio asperiores mollitia dolorem consectetur explicabo sapiente iste laboriosam. Facilis, rerum! Ea soluta aut non possimus nostrum. Fugit, asperiores, inventore temporibus dolorem voluptatibus debitis, consectetur laborum provident corrupti accusantium perspiciatis harum. Aut quam quibusdam porro similique corrupti pariatur praesentium cumque odit recusandae dolore impedit, obcaecati nobis et voluptatibus autem aliquid cum debitis non ipsam aperiam aliquam repellat odio! Ea laudantium natus fugit temporibus itaque sapiente, cupiditate maxime maiores saepe, laboriosam, placeat quam quidem sint corrupti ipsa? Vitae fugiat, officia labore ratione iure blanditiis. Asperiores magnam quis, amet est repellat possimus quidem veniam tenetur a, esse molestiae sit reprehenderit debitis fugit sequi vitae hic accusamus temporibus eius nam et dolorum voluptates in! Officiis porro dolor deleniti sed ipsam voluptas sunt reprehenderit id illum non quisquam cum consectetur repudiandae, quod, ipsa facere vero excepturi delectus nisi ut voluptate architecto quibusdam, nihil optio. Velit non quod consequuntur consequatur sapiente ullam ex et obcaecati inventore voluptas id, debitis nemo natus nam fugit, iure pariatur voluptatibus. Quia ipsa explicabo tempora reprehenderit quis provident illum! Distinctio nemo numquam consequuntur voluptates culpa doloribus voluptatibus autem atque magnam obcaecati rerum temporibus quam, tempore facere reiciendis quis dignissimos odio porro harum quaerat id accusantium, voluptatum aut accusamus? Inventore quos quibusdam id. Impedit laudantium totam, minima tenetur obcaecati saepe, delectus placeat quas eligendi debitis aspernatur? Laboriosam, perferendis. Cum, quod. Est, ipsum animi iusto, consequatur veritatis minima soluta ratione debitis blanditiis corrupti excepturi voluptas repellendus eligendi, voluptate aliquam veniam. Nam praesentium nihil debitis quo natus itaque quos sunt ullam non quas, asperiores, libero, iure obcaecati sint. Inventore, ducimus. Cupiditate praesentium ullam perspiciatis culpa, dolore ut laborum. Facilis porro quasi quibusdam. Possimus, laudantium quasi quam tempora nisi exercitationem fugiat tenetur enim laborum praesentium fugit laboriosam unde voluptatum ut deleniti assumenda esse neque quod magnam numquam ex? Sapiente asperiores ipsam ratione, minus deserunt omnis quam quisquam autem quo aspernatur dolor quos recusandae odit maxime! Ipsam aperiam voluptatum quam voluptate tempore?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, dicta possimus laborum tempora aliquam dolorum, ex excepturi quisquam nostrum quidem iste aut iusto facilis est odio architecto, velit harum nemo amet explicabo! Repellendus quisquam, deserunt minus adipisci nihil dolores, dignissimos et eveniet sed vel, ut in blanditiis eum saepe! Sed quam officiis sint dolorum autem laborum fugit neque hic! Adipisci debitis exercitationem dignissimos nobis nesciunt consequatur maxime aut ullam? Quidem veritatis architecto deleniti officiis dolores facere. Magnam porro atque corporis enim velit officia ratione sequi, esse expedita, fugit dolores! Error eaque debitis harum ipsum dignissimos dolorem tempora quis culpa. Incidunt, quos, labore explicabo libero tempore cum amet saepe accusantium repellat pariatur illo! Provident repellat distinctio, qui omnis reprehenderit fugiat tempora facilis quidem sint, quas numquam officiis veritatis at, libero voluptatem obcaecati placeat culpa? Natus magnam, ipsa ipsum minus vero praesentium ratione beatae deleniti, mollitia ea dolor delectus enim suscipit fuga accusantium molestias consequuntur animi expedita? Et deleniti ad fugit esse nisi aliquam incidunt at est praesentium? Optio adipisci nesciunt iure, recusandae voluptates itaque nulla nisi a cum dignissimos? Rerum officia, nisi culpa, beatae distinctio asperiores mollitia dolorem consectetur explicabo sapiente iste laboriosam. Facilis, rerum! Ea soluta aut non possimus nostrum. Fugit, asperiores, inventore temporibus dolorem voluptatibus debitis, consectetur laborum provident corrupti accusantium perspiciatis harum. Aut quam quibusdam porro similique corrupti pariatur praesentium cumque odit recusandae dolore impedit, obcaecati nobis et voluptatibus autem aliquid cum debitis non ipsam aperiam aliquam repellat odio! Ea laudantium natus fugit temporibus itaque sapiente, cupiditate maxime maiores saepe, laboriosam, placeat quam quidem sint corrupti ipsa? Vitae fugiat, officia labore ratione iure blanditiis. Asperiores magnam quis, amet est repellat possimus quidem veniam tenetur a, esse molestiae sit reprehenderit debitis fugit sequi vitae hic accusamus temporibus eius nam et dolorum voluptates in! Officiis porro dolor deleniti sed ipsam voluptas sunt reprehenderit id illum non quisquam cum consectetur repudiandae, quod, ipsa facere vero excepturi delectus nisi ut voluptate architecto quibusdam, nihil optio. Velit non quod consequuntur consequatur sapiente ullam ex et obcaecati inventore voluptas id, debitis nemo natus nam fugit, iure pariatur voluptatibus. Quia ipsa explicabo tempora reprehenderit quis provident illum! Distinctio nemo numquam consequuntur voluptates culpa doloribus voluptatibus autem atque magnam obcaecati rerum temporibus quam, tempore facere reiciendis quis dignissimos odio porro harum quaerat id accusantium, voluptatum aut accusamus? Inventore quos quibusdam id. Impedit laudantium totam, minima tenetur obcaecati saepe, delectus placeat quas eligendi debitis aspernatur? Laboriosam, perferendis. Cum, quod. Est, ipsum animi iusto, consequatur veritatis minima soluta ratione debitis blanditiis corrupti excepturi voluptas repellendus eligendi, voluptate aliquam veniam. Nam praesentium nihil debitis quo natus itaque quos sunt ullam non quas, asperiores, libero, iure obcaecati sint. Inventore, ducimus. Cupiditate praesentium ullam perspiciatis culpa, dolore ut laborum. Facilis porro quasi quibusdam. Possimus, laudantium quasi quam tempora nisi exercitationem fugiat tenetur enim laborum praesentium fugit laboriosam unde voluptatum ut deleniti assumenda esse neque quod magnam numquam ex? Sapiente asperiores ipsam ratione, minus deserunt omnis quam quisquam autem quo aspernatur dolor quos recusandae odit maxime! Ipsam aperiam voluptatum quam voluptate tempore?
    </>
  )
}
