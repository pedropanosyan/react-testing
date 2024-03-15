import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {
	Card, CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Toaster} from "@/components/ui/toaster.jsx";


const formSchema = z
	.object({
		current: z.string().min(8).max(50),
		new: z.string().min(8).max(50),
		newRepeated: z.string().min(8).max(50),
	})
	.refine(data => data.new === data.newRepeated &&
		data.current !== data.new, {
		message: "Passwords don't match",
	})

export const PasswordTab = () => {

	const [loggedIn, setLoggedIn] = useState(false)

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			current: '',
			new: '',
			newRepeated: ''
		}
	})

	const onSubmit = (values) => {
		console.log({ values })
		setLoggedIn(!loggedIn)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>
					Change your password here. After saving, you'll be logged out.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="current"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current password</FormLabel>
									<FormControl>
										<Input placeholder="Current" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="new"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New password</FormLabel>
									<FormControl>
										<Input placeholder="New" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newRepeated"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Repeat new password</FormLabel>
									<FormControl>
										<Input placeholder="Repeat new" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</CardContent>
			{loggedIn && <p>Password changed</p>}
		</Card>
	)
}
