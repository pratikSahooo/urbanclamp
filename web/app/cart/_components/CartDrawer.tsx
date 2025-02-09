"use client";

import { ShoppingCartIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    emptyCart,
    removeFromCart,
    selectCurrentItems,
} from "@/store/features/cart/CartSlice";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function CartDrawer() {
    const cartItems = useAppSelector(selectCurrentItems);
    const dispatch = useAppDispatch();

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden lg:inline-flex"
                >
                    <div className="flex justify-center items-start relative">
                        <ShoppingCartIcon className="h-[1.2rem] w-[1.2rem]" />
                        {cartItems.length > 0 ? (
                            <div className="bg-red-500 text-white rounded-full flex justify-center items-center w-4 h-4 -ml-2 -mt-2">
                                <span className="text-xs">
                                    {cartItems.length}
                                </span>
                            </div>
                        ) : null}
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm lg:max-w-7xl">
                    <DrawerHeader className="flex flex-col space-y-1 justify-center items-center">
                        <DrawerTitle>Your Cart</DrawerTitle>
                        <DrawerDescription>
                            Your selected services will be shown here
                        </DrawerDescription>
                    </DrawerHeader>
                    <ScrollArea
                        className={cn("px-4", {
                            "h-80": cartItems.length > 4,
                        })}
                    >
                        {cartItems.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 w-full pb-1">
                                {cartItems?.map((cart, index) => (
                                    <Card key={index}>
                                        <CardContent className="pt-6 flex flex-col space-y-2">
                                            <div>
                                                <div className="flex flex-col space-y-1 w-full">
                                                    <div className="flex w-full justify-between items-center">
                                                        <div className="flex flex-col">
                                                            <span className="text-base font-semibold">
                                                                {cart.title}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {
                                                                    cart.serviceCategory
                                                                }
                                                            </span>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                dispatch(
                                                                    removeFromCart(
                                                                        cart.title
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <Trash2Icon className="h-[1.2rem] w-[1.2rem] text-red-500" />
                                                        </Button>
                                                    </div>
                                                    <div className="text-sm flex space-x-2">
                                                        <span>
                                                            ₹ {cart.price}
                                                        </span>
                                                        <span>&#x2022;</span>
                                                        <span>
                                                            {cart.duration}
                                                        </span>
                                                    </div>
                                                    <Link
                                                        href={`/partners/${cart.partnerSlug}`}
                                                    >
                                                        <span className="text-sm hover:underline underline-offset-4">
                                                            {cart.partnerName}
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full flex flex-col space-y-5 items-center justify-center">
                                <Image
                                    src="/images/icons/empty-cart.png"
                                    alt="hehe"
                                    height={80}
                                    width={80}
                                    className="dark:invert"
                                />
                                <div className="text-center space-y-0">
                                    <h4>Your cart is empty</h4>
                                    <h4 className="text-muted-foreground text-sm">
                                        Lets add some services
                                    </h4>
                                </div>
                            </div>
                        )}
                    </ScrollArea>
                    <DrawerFooter className="flex flex-col lg:flex-row-reverse justify-center">
                        {cartItems.length > 0 ? (
                            <>
                                <DrawerClose asChild>
                                    <Button
                                        className="lg:w-80"
                                        asChild
                                    >
                                        <Link href="/checkout">Checkout</Link>
                                    </Button>
                                </DrawerClose>
                                <DrawerClose asChild>
                                    <Button
                                        className="lg:w-80"
                                        variant="destructive"
                                        onClick={() => dispatch(emptyCart())}
                                    >
                                        <Trash2Icon className="h-4 w-4 mr-2" />
                                        <span>Empty Cart</span>
                                    </Button>
                                </DrawerClose>
                            </>
                        ) : null}
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
