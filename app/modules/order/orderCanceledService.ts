import {db} from "~/libs/prisma/db.server"

export default async function CanceledService (){
  return await db.invoice.findMany({
    where:{
      status: "CANCELED"
    },
    include:{
      cart:{
        include:{
          cartItems:{
            include:{
              product:{
                include:{
                  attachments:true
                }
              }
            }
          }
        }
      }
    }
  })
}
