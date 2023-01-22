import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { useState } from 'react'
import Modal from '.'
import Button from '@/components/Button'

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

export const Default: ComponentStory<typeof Modal> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => { setIsModalOpen(true) }}>Show Modal</Button>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error commodi natus eos et qui cum reiciendis voluptas sunt praesentium assumenda atque fuga laborum magnam pariatur, provident quasi amet, eligendi fugit?
      </Modal>
    </>
  )
}

export const BigContent: ComponentStory<typeof Modal> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => { setIsModalOpen(true) }}>Show Modal</Button>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi illo quibusdam vero dolorem vel. Saepe, accusamus. Iusto consequuntur facilis a numquam fugit, perferendis, natus nisi porro corrupti iure odit minus pariatur veniam saepe sequi quasi ullam adipisci consectetur nam quam. Qui architecto vero distinctio deserunt explicabo odio, eligendi omnis, libero soluta autem nesciunt minus fuga atque commodi dicta molestiae. Voluptates accusamus aperiam dicta consequuntur sed iusto, doloremque, ullam exercitationem vero a nostrum eos distinctio consectetur. Praesentium reprehenderit, dolorum aspernatur eos enim illo possimus aliquam explicabo accusamus voluptate animi adipisci. Laudantium odit non eaque dolorum recusandae minima, reprehenderit veritatis esse quia, aliquid voluptates magni est sit, corporis vitae nulla dolor provident illo ipsum maxime suscipit doloremque. Fugiat impedit pariatur tempore fuga nulla cupiditate suscipit autem reiciendis? Harum incidunt tenetur maxime iste fuga totam temporibus sunt beatae facilis labore, maiores sapiente illo ab iusto dolorum nam vitae voluptatum deleniti deserunt molestiae nemo minus reprehenderit! Esse rem, vero neque eaque voluptates ducimus est distinctio ex perspiciatis nostrum. Velit commodi ea veniam, libero magnam nisi ipsam ex officiis aliquam, architecto nesciunt nobis atque rerum? Ipsam cupiditate excepturi fugiat, consectetur nemo, ratione velit consequatur, recusandae corrupti eius quisquam accusantium voluptatum natus beatae et architecto. Ea at rerum a architecto quasi eligendi amet eaque praesentium unde officiis. Animi ducimus obcaecati dolorem, laudantium ratione tenetur? Incidunt vitae nostrum adipisci doloremque! Recusandae dolores magni earum quas omnis? Incidunt expedita veritatis harum minus consequatur, repellendus ut maxime molestiae tempora alias totam, ipsum quos doloremque odit? Corporis facilis necessitatibus voluptatum ex enim consectetur iure soluta incidunt ipsa harum, sapiente accusantium dolorem, eligendi, autem rem hic nesciunt voluptates repellendus! Eaque delectus cupiditate eius, placeat sunt impedit. Amet sit ea veritatis neque earum debitis necessitatibus veniam aut dolorem. Repellat magni quisquam dolore nihil, cum alias rem laboriosam, excepturi minima autem deleniti accusamus illo recusandae! Adipisci hic veritatis at! Error blanditiis voluptas ab odit saepe eaque quae unde, quaerat eum cumque, neque quam voluptatem incidunt iste magnam, nihil tempore at labore quia amet. Nulla facere magni nihil optio accusamus laborum eos at enim non odit magnam aut ex eum quam sequi, nisi nostrum sit ipsa illo, laudantium rem accusantium illum. Nobis odio laborum, aut numquam cupiditate blanditiis velit consequuntur earum ratione, minus odit debitis est rerum nemo porro laudantium cumque fugit quam qui ipsum distinctio? Necessitatibus velit alias accusantium dolor eum aliquid totam numquam nobis quas reiciendis quisquam maxime repellat exercitationem quos illo expedita facilis, at possimus ipsa corporis id modi illum! Provident qui soluta reiciendis vel, iste sint fugiat atque temporibus sed mollitia laboriosam doloremque aut. Commodi a assumenda iusto adipisci debitis maxime tempora aperiam in? Accusamus dignissimos quo obcaecati reprehenderit tenetur porro accusantium molestias cum numquam minus laboriosam earum aspernatur modi, facilis ipsum, nam optio eos corrupti quidem impedit magni fugit? Totam, similique provident dolor harum libero assumenda laudantium consequuntur? Ut laudantium modi aperiam quaerat, repellat eligendi cum omnis earum nulla provident. Magni placeat ad ut at sit aliquid perspiciatis. Quo accusantium aperiam exercitationem eveniet ea tempore quam molestiae pariatur. Optio neque fugit officiis quisquam, ratione atque fuga eos exercitationem modi debitis quaerat. Aut, et assumenda. Eius a perspiciatis maiores est in fuga, perferendis repellat. Deleniti obcaecati quaerat et, rerum provident optio veritatis iure magni animi est delectus explicabo repudiandae quibusdam numquam quisquam adipisci atque maiores praesentium ea! Similique quia adipisci laudantium ipsa, modi cum ratione illo, harum vero aliquam quod, fugiat doloremque suscipit. Iste neque delectus dolor ipsum laudantium quas esse. Aut labore modi enim inventore laudantium amet aperiam a. Ipsum accusantium facere, possimus voluptatibus reiciendis quaerat omnis eveniet dicta soluta, incidunt sequi ratione ab dolor pariatur? Illo ab, quis vitae dolorem in vero nam repudiandae odit impedit, voluptate doloribus assumenda architecto placeat animi sapiente? Laboriosam deleniti earum placeat, aperiam sit exercitationem. Repudiandae, perspiciatis omnis? Veniam ab fuga neque nihil magnam sint dignissimos earum explicabo repellendus hic dolores, minus doloribus adipisci dicta quisquam distinctio! Commodi cumque eaque facilis, libero nostrum assumenda sequi quisquam, eos ex, accusamus sed rerum deserunt fugiat. Voluptatum, corrupti asperiores, nesciunt repellendus ullam dolorem nobis facilis, quia provident eaque voluptatem ex voluptates molestiae quis quos aliquid officia excepturi libero expedita mollitia quod unde? At dolores a dolorem animi sed accusantium non inventore quidem magni cumque aliquam corporis dolor, ex voluptates quibusdam assumenda commodi placeat voluptatem obcaecati nostrum voluptatum sint voluptate ea perferendis? Praesentium reprehenderit commodi hic doloribus quo veniam fugit, consectetur impedit ullam, sapiente aspernatur magnam ut deserunt, facilis dolores provident odio ea aliquam! Voluptatum mollitia, inventore quaerat similique soluta cumque possimus. Aliquam nisi sequi illum deserunt cupiditate assumenda hic iure, non itaque error consequuntur accusantium. Error, consequatur dolore! Fugit magnam voluptatum officiis, esse inventore neque quibusdam tempora pariatur assumenda error ducimus soluta repellendus libero iusto quae illum commodi quas? Quibusdam earum, ut numquam corrupti temporibus voluptatibus ullam eaque rerum accusamus doloribus sapiente sequi! Unde magni porro, nesciunt eum voluptas exercitationem consequuntur accusantium ad cumque quo enim deleniti perspiciatis nisi consectetur ab cum assumenda? Ab quaerat vitae, in facere quasi dignissimos odio, recusandae nisi nostrum aut quia totam maiores nihil beatae expedita accusamus facilis molestias sunt perspiciatis cupiditate repudiandae consequatur, dolorum cumque et? Numquam et, illo sequi maxime alias, incidunt deleniti sed, officiis nulla iste commodi culpa aspernatur omnis. Sit officiis corrupti iste tenetur doloribus eos quo odit iusto necessitatibus, assumenda ad nulla labore repellendus rerum voluptatibus fugiat esse facilis excepturi earum alias nostrum, corporis dignissimos voluptates dolor! Doloribus non, deleniti ipsam voluptas repellat vitae. Praesentium, rerum. Quam voluptates tempore maiores repudiandae architecto, explicabo provident amet nobis, voluptas error non maxime voluptatibus corrupti dolore veritatis fugiat quae? Exercitationem nam reiciendis nemo quis veritatis, sequi nobis repellat atque consequuntur? Ex, cum molestiae dolore perspiciatis neque possimus dolor similique quas autem culpa laborum. Quibusdam error perferendis inventore laboriosam repellendus deserunt iure mollitia! At temporibus natus quibusdam esse, molestiae placeat reprehenderit vitae ea excepturi cumque odit eum quia deleniti quisquam quo optio voluptates eos eligendi. Harum sequi cupiditate a est delectus accusantium iusto dolore ullam dolorem, fuga nihil quam atque dolor, animi dignissimos impedit sint eum provident, illo blanditiis facilis?
      </Modal>
    </>
  )
}
