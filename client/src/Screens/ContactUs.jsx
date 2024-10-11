import Layout from '../Layout/Layout'
import Head from '../Components/Head'
import { FiPhoneCall, FiMapPin, FiMail } from 'react-icons/fi'



const ContactUs = () => {
    const ContactData = [
      {
        id: 1,
        title:"Email Us",
        info:"Interactive grow backend ideas for cross-platform models. ",
        icon:FiMail,
        contact:"info@zpunet.com"

      },
      {
        id: 2,
        title:"Call Us",
        info:"Distinctively exploit optimal alignment for intuitive bandwidth. ",
        icon:FiPhoneCall,
        contact:"+255 789 456 123"
      },
      {
        id: 3,
        title:"Location",
        info:"Dar es salam, Taznia. 345 kigamboni, street No. 12 Dar es salam, Taznia. 345 kigamboni, street No. 12 ",
        icon:FiMapPin,
        contact:""
      }
    ]
  return (
    <Layout>
    <div className='min-height-screen container mx-auto px-2 my-6'>
      <Head title="Contact Us"/>
      <div className='grid mg-grid-cols-2 gap-6 lg:my-20 mt-10 lg:grid-cols-3 xl:gap-8'>
       {
        ContactData.map((item) => (
          <div key={item.id} className='border border-border flex-col p-10 bg-dry rounded-lg text-center'>
            <span className='flex-colo w-20 h-20 rounded-full bg-main text-subMain text-2xl'>
              <item.icon />
            </span>
            <h5 className='text-2xl font-semibold mb-2'>{item.title}</h5>
            <p className='mb-0 text-sm text-text leading-7'>
              <a href={`mailto:${item.contact}`} className='text-blue-600'>{item.contact}
              </a>{' '}
              {item.info}
            </p>
          </div>
        ))
       }
      </div>
    </div>
      
    </Layout>
  )
}

export default ContactUs