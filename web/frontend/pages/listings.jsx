import {
  Card,
  Page,
  Layout,
  DataTable,
  Link,
  SkeletonBodyText,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import useToast from "../hooks/useToast";

export default function Listings() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast] = useToast();

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.length)
          setUserData([
            ...data.map((user, idx) => {
              return [
                idx,
                user.name,
                user.username,
                <Link url={`mailto: ${user.email}`} external>
                  {user.email}
                </Link>,
                user.phone,
                <Link url="" onClick={() => showToast(user.name)}>
                  Action
                </Link>,
              ];
            }),
          ]);
        else setUserData([]);
        setLoading(false);
      });
  }, []);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Listings Grid" sectioned>
            {loading ? (
              <SkeletonBodyText />
            ) : (
              <DataTable
                columnContentTypes={[
                  "numeric",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                ]}
                headings={[
                  "Id",
                  "Name",
                  "Username",
                  "Email",
                  "Phone",
                  "Action",
                ]}
                rows={userData}
              />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
