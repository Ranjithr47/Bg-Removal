import {Webhook} from 'svix'
import userModel from '../models/userModel.js'

// API contoller function to manage Clerk user with database 
// http://localhost:4000/api/user/webhooks 

const clerkWebhooks = async (req, res) => {
    
    try {
        // Create a avix instance with clerk webhook secret 
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET) 

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })

        const { data, type } = req.body

        switch (type) {
            case "user.created":{

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.create(userData)
                res.json({})

                break;
            }
            case "user.updated":{

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.findOneAndUpdate({clerkId: data.id}, userData)
                res.json({})

                break;
            }
            case "user.deleted":{

                await userModel.findOneAndDelete({clerkId: data.id})
                res.json({})
                
                break;
            }
                
            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}

// API controller function to get user available credits data
const userCredits = async (req, res) => {
    try {
        const {clerkId} = req.body 
        const userData = await userModel.findOne({clerkId})
        res.json({success:true, credits: userData.creditBalance})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to makepayment for credits
const paymentRazorpay = async (req, res) => {
    res.status(501).json({ success: false, message: "Purchase is unavailable in demo" });
  };
  

export {clerkWebhooks, userCredits, paymentRazorpay}